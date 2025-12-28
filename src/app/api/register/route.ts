import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { v2 as cloudinary } from "cloudinary";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "<YOUR_SHEET_ID_HERE>";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getAuth() {
  // Build credentials object from individual environment variables
  const credentials = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  };
  
  // Validate that all required credentials are present
  if (!credentials.project_id || !credentials.private_key || !credentials.client_email) {
    throw new Error("Missing required Google service account credentials in environment variables");
  }
  
  return new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });
}

async function uploadToCloudinary(file: File): Promise<string> {
  // Convert File to base64
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
  
  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(base64, {
    folder: "hackhorizon-registrations",
    resource_type: "auto",
  });
  
  return result.secure_url;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const teamName = formData.get("teamName") as string;
    const collegeName = formData.get("collegeName") as string;
    const leaderStr = formData.get("leader") as string;
    const membersStr = formData.get("members") as string;
    const additionalPhone = formData.get("additionalPhone") as string;
    const transactionId = formData.get("transactionId") as string;
    const paymentFile = formData.get("paymentScreenshot") as File | null;
    
    const auth = await getAuth();
    let paymentScreenshotUrl = "";
    
    // Upload image to Cloudinary
    if (paymentFile) {
      paymentScreenshotUrl = await uploadToCloudinary(paymentFile);
    }
    
    const sheets = google.sheets({ version: "v4", auth });
    const now = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const leader = JSON.parse(leaderStr);
    const members = JSON.parse(membersStr);
    
    // Always create array with all 5 member slots (leader + 4 members)
    // Fill empty slots with empty strings
    const allMembers = Array(4).fill(null).map((_, i) => 
      members[i] || { name: "", email: "" }
    );
    
    const row = [
      now,
      teamName,
      collegeName,
      leader.name,
      leader.email,
      leader.phone,
      additionalPhone,
      allMembers[0].name, allMembers[0].email,  // Member 2
      allMembers[1].name, allMembers[1].email,  // Member 3
      allMembers[2].name, allMembers[2].email,  // Member 4
      allMembers[3].name, allMembers[3].email,  // Member 5
      transactionId,
      paymentScreenshotUrl,
    ];
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
