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

function formatPrivateKey(key: string): string {
  let formattedKey = key;

  // Remove surrounding quotes if present
  if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
    formattedKey = formattedKey.slice(1, -1);
  }
  if (formattedKey.startsWith("'") && formattedKey.endsWith("'")) {
    formattedKey = formattedKey.slice(1, -1);
  }
  
  // Replace literal \n with actual newlines
  formattedKey = formattedKey.split('\\n').join('\n');
  
  // If still no newlines, try to add them
  if (!formattedKey.includes('\n')) {
    formattedKey = formattedKey
      .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
      .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----');
  }
  
  console.log('Private key format check:');
  console.log('- Has BEGIN marker:', formattedKey.includes('-----BEGIN PRIVATE KEY-----'));
  console.log('- Has END marker:', formattedKey.includes('-----END PRIVATE KEY-----'));
  console.log('- Has newlines:', formattedKey.includes('\n'));
  console.log('- Key length:', formattedKey.length);
  
  return formattedKey;
}

async function getAuth() {
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY || '';
  
  // Check if credentials are properly configured
  if (!process.env.GOOGLE_PROJECT_ID || !process.env.GOOGLE_CLIENT_EMAIL || !rawPrivateKey) {
    throw new Error(
      "Missing Google service account credentials. Please check your .env file and ensure " +
      "GOOGLE_PROJECT_ID, GOOGLE_CLIENT_EMAIL, and GOOGLE_PRIVATE_KEY are set."
    );
  }
  
  const privateKey = formatPrivateKey(rawPrivateKey);
  
  const credentials = {
    type: "service_account" as const,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: privateKey,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  };
  
  // Validate private key format
  if (!credentials.private_key.includes('-----BEGIN PRIVATE KEY-----')) {
    throw new Error("Invalid private key format - missing PEM header. Please check GOOGLE_PRIVATE_KEY in .env");
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
  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error(
      "Cloudinary not configured. Please check your .env file and ensure " +
      "CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set."
    );
  }
  
  // Convert File to base64 with optimization
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
  
  // Upload to Cloudinary with optimizations for faster processing
  const result = await cloudinary.uploader.upload(base64, {
    folder: "hackhorizon-registrations",
    resource_type: "auto",
    quality: "auto:good", // Optimize quality vs size
    format: "webp", // Convert to WebP for smaller file size
    transformation: [
      { width: 800, height: 600, crop: "limit" }, // Limit size for faster upload
      { quality: "auto" }
    ]
  });
  
  return result.secure_url;
}


export async function POST(req: NextRequest) {
  try {
    // Log start of request
    console.log("Received registration request");
    
    const formData = await req.formData();
    
    const teamName = formData.get("teamName") as string;
    const collegeName = formData.get("collegeName") as string;
    const registrationType = formData.get("registrationType") as string;
    const leaderStr = formData.get("leader") as string;
    const membersStr = formData.get("members") as string;
    const additionalPhone = formData.get("additionalPhone") as string;
    const transactionId = formData.get("transactionId") as string;
    const paymentFile = formData.get("paymentScreenshot") as File | null;
    
    console.log("Form data received:", { teamName, collegeName, registrationType, transactionId });
    
    // Validate required fields
    if (!teamName || !collegeName || !registrationType || !leaderStr || !membersStr || !transactionId) {
      console.error("Missing required fields");
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Parse JSON data early for validation
    let leader, members;
    try {
      leader = JSON.parse(leaderStr);
      members = JSON.parse(membersStr);
      console.log("Parsed leader and members successfully");
    } catch (parseError: any) {
      console.error("Failed to parse JSON data:", parseError);
      return NextResponse.json(
        { success: false, error: "Invalid data format" },
        { status: 400 }
      );
    }
    
    // Run auth and cloudinary upload in parallel to save time
    const [auth, paymentScreenshotUrl] = await Promise.all([
      getAuth(),
      paymentFile ? uploadToCloudinary(paymentFile) : Promise.resolve("")
    ]);
    
    console.log("File upload completed");
    
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
    
    // Always create array with all 5 member slots (leader + 4 members)
    // Fill empty slots with empty strings
    const allMembers = Array(4).fill(null).map((_, i) => 
      members[i] || { name: "", email: "", phone: "", department: "", year: "" }
    );
    
    // Google Sheets row data: Flat list matching all collected fields
    const row = [
      now,
      teamName,
      collegeName,
      registrationType,
      // Leader details
      leader.name,
      leader.email,
      leader.phone,
      leader.department,
      leader.year,
      additionalPhone,
      // Member 2 details
      allMembers[0].name, allMembers[0].email, allMembers[0].phone, allMembers[0].department, allMembers[0].year,
      // Member 3 details
      allMembers[1].name, allMembers[1].email, allMembers[1].phone, allMembers[1].department, allMembers[1].year,
      // Member 4 details
      allMembers[2].name, allMembers[2].email, allMembers[2].phone, allMembers[2].department, allMembers[2].year,
      // Member 5 details
      allMembers[3].name, allMembers[3].email, allMembers[3].phone, allMembers[3].department, allMembers[3].year,
      // Payment details
      transactionId,
      paymentScreenshotUrl,
    ];
    
    console.log("Attempting to write to Google Sheets...");
    
    // Add timeout to Google Sheets operation
    const sheetsWritePromise = sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Google Sheets write timeout')), 15000); // 15 second timeout
    });

    await Promise.race([sheetsWritePromise, timeoutPromise]);
    console.log("Successfully wrote to Google Sheets");
    console.log("Registration data processed successfully");
    console.log("Registration details:", {
      teamName,
      collegeName,
      registrationType,
      leader: leader.name,
      timestamp: now,
      paymentScreenshot: paymentScreenshotUrl ? "Uploaded" : "None"
    });
    return NextResponse.json({ 
      success: true,
      message: "Registration successful!" 
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0', // Prevent caching of registration responses
      }
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    console.error("Error stack:", error.stack);
    console.error("Error message:", error?.message);
    
    // Return detailed error message for debugging
    return NextResponse.json(
      { 
        success: false, 
        error: error?.message || "Unknown error",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined 
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        }
      }
    );
  }
}