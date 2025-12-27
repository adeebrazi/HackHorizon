"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Audio from "@/components/ui/Audio";
import playClickSound from "@/utils/ButtonClickedSound";

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [team, setTeam] = useState<{
    teamName: string;
    collegeName: string;
    leader: { name: string; email: string; phone: string };
    members: { name: string; email: string }[];
    additionalPhone: string;
    transactionId: string;
    paymentScreenshot: File | null;
    termsAccepted: boolean;
  }>({
    teamName: "",
    collegeName: "",
    leader: { name: "", email: "", phone: "" },
    members: [
      { name: "", email: "" },
      { name: "", email: "" },
    ],
    additionalPhone: "",
    transactionId: "",
    paymentScreenshot: null,
    termsAccepted: false,
  });
  const [memberCount, setMemberCount] = useState<number>(3);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    idx?: number,
    leader = false
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "paymentScreenshot" && files && files.length > 0) {
      const file = files[0];
      if (!file) {
        setFileError("");
        setTeam((prev) => ({ ...prev, paymentScreenshot: null }));
        return;
      }
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (file.size > maxSize) {
        setFileError("File size must be less than 2MB");
        setTeam((prev) => ({ ...prev, paymentScreenshot: null }));
        e.target.value = ""; // Reset file input
        return;
      }
      setFileError("");
      setTeam((prev) => ({ ...prev, paymentScreenshot: file }));
      return;
    }
    if (leader) {
      setTeam((prev) => ({ ...prev, leader: { ...prev.leader, [name]: value } }));
    } else if (typeof idx === "number") {
      setTeam((prev) => {
        const members = [...prev.members];
        (members[idx] as any)[name] = value;
        return { ...prev, members };
      });
    } else {
      setTeam((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMemberCount = (count: number) => {
    setMemberCount(count);
    setTeam((prev) => ({
      ...prev,
      members: Array(count - 1)
        .fill(0)
        .map((_, i) => prev.members[i] || { name: "", email: "" }),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);
    try {
      const formData = new FormData();
      Object.entries(team).forEach(([key, value]) => {
        if (key === "members") {
          formData.append("members", JSON.stringify(value));
        } else if (key === "leader") {
          formData.append("leader", JSON.stringify(value));
        } else if (key === "paymentScreenshot" && value instanceof File) {
          formData.append("paymentScreenshot", value);
        } else if (key !== "paymentScreenshot" && value !== null) {
          formData.append(key, String(value));
        }
      });
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
      if (res.ok) setSuccess(true);
      else throw new Error("Submission failed");
    } catch (err: any) {
      setError(err?.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  // Validation functions for each step
  const isStep1Valid = () => {
    return team.teamName.trim().length >= 3 && team.collegeName.trim().length >= 3;
  };

  const isStep2Valid = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return (
      team.leader.name.trim().length >= 2 &&
      emailRegex.test(team.leader.email) &&
      phoneRegex.test(team.leader.phone) &&
      phoneRegex.test(team.additionalPhone)
    );
  };

  const isStep3Valid = () => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return team.members.every(
      (member) => member.name.trim().length >= 2 && emailRegex.test(member.email)
    );
  };

  const isStep4Valid = () => {
    return (
      team.transactionId.trim().length >= 12 &&
      team.paymentScreenshot !== null &&
      !fileError &&
      team.termsAccepted
    );
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return isStep3Valid();
      case 4:
        return isStep4Valid();
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && canProceedToNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Audio Component */}
      <Audio />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,0,0.3),transparent_50%)]" />
      {/* Removed missing noise.png background */}

      {/* Barbarian Character with Speech Bubble */}
      {!success && !error && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed bottom-0 left-0 z-50 pointer-events-none hidden lg:block"
        >
          <div className="relative">
            {/* Barbarian Image */}
            <Image
              src="/VillageBarbarian/barbarian4.webp"
              alt="Barbarian Guide"
              width={200}
              height={400}
              className="drop-shadow-2xl"
              priority
            />
            {/* Speech Bubble */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-64 left-40 bg-white rounded-2xl p-4 border-4 border-[#4C1D00] shadow-2xl w-72"
              style={{
                boxShadow: "0 0 20px rgba(232, 192, 104, 0.6)",
              }}
            >
              <div className="absolute -left-4 bottom-8 w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-white border-b-[20px] border-b-transparent" />
              <p className="text-[#1a1206] font-bold text-sm leading-relaxed">
                {currentStep === 1 && "Rally your troops! Enter your team details to begin the quest."}
                {currentStep === 2 && "Every great team needs a fearless leader. Show us who commands this squad!"}
                {currentStep === 3 && "Assemble your warriors! The strongest clans have the mightiest members."}
                {currentStep === 4 && "Time to pay the entry toll! Scan, pay, and upload proof of your tribute."}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Success Section */}
      {success && (
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-gradient-to-b from-[#1a1206] to-[#0a0a0a] rounded-xl shadow-2xl border-2 sm:border-4 border-[#4C1D00] p-6 sm:p-8 md:p-12 text-center animate-fadeIn"
            style={{
              boxShadow: "0 0 40px rgba(232, 192, 104, 0.4), inset 0 0 30px rgba(0,0,0,0.6)",
            }}
          >
            <div className="mb-4 sm:mb-6">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-[#E8C068] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8C068] text-3d mb-3 sm:mb-4 px-2">
              REGISTRATION SUCCESSFUL!
            </h2>
            <p className="text-lg sm:text-xl text-[#FFD700] mb-2 sm:mb-3 font-semibold px-2">
              Your team has been successfully registered for HackHorizon.
            </p>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto px-4">
              Thank you for registering! You will receive a confirmation email shortly with further details and instructions. Please check your inbox (and spam folder) for updates.
            </p>
            <a
              href="/"
              onClick={playClickSound}
              className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-b from-[#FFD700] to-[#E8C068] hover:from-[#E8C068] hover:to-[#D4AF37] text-[#1a1206] font-bold text-lg sm:text-xl rounded-lg border-2 border-[#4C1D00] transition-all transform hover:scale-105 active:scale-95"
              style={{
                boxShadow: "0 6px 0 #4C1D00, 0 10px 20px rgba(232,192,104,0.5)",
                textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
              }}
            >
              CLOSE
            </a>
          </div>
        </div>
      )}

      {/* Error Section */}
      {error && !success && (
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-gradient-to-b from-[#2a0a0a] to-[#0a0a0a] rounded-xl shadow-2xl border-2 sm:border-4 border-red-600 p-6 sm:p-8 md:p-12 text-center animate-fadeIn"
            style={{
              boxShadow: "0 0 40px rgba(220, 38, 38, 0.4), inset 0 0 30px rgba(0,0,0,0.6)",
            }}
          >
            <div className="mb-4 sm:mb-6">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 text-3d mb-3 sm:mb-4 px-2">
              REGISTRATION FAILED
            </h2>
            <p className="text-base sm:text-lg text-red-200 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto px-4">
              {error}
            </p>
            <button
              onClick={() => {
                playClickSound();
                setError("");
                setSuccess(false);
              }}
              className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-lg sm:text-xl rounded-lg border-2 border-red-900 transition-all transform hover:scale-105 active:scale-95"
              style={{
                boxShadow: "0 6px 0 #7f1d1d, 0 10px 20px rgba(220,38,38,0.5)",
                textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
              }}
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {!success && !error && (
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-6 md:mb-8 text-3d-clash px-4">
            TEAM REGISTRATION
          </h1>

          {/* Progress Bar */}
          <div className="w-full max-w-2xl mb-6 md:mb-8 px-4">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-4 ${
                    currentStep >= step
                      ? "border-[#E8C068] bg-[#4C1D00] text-[#E8C068]"
                      : "border-gray-600 bg-gray-800 text-gray-500"
                  } font-bold text-sm sm:text-lg transition-all duration-300`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full h-3 sm:h-4 bg-gray-800 rounded-full border-2 border-gray-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E8C068] to-[#FFD700] transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-gray-400">
              <span>Team Info</span>
              <span>Leader</span>
              <span>Members</span>
              <span>Payment</span>
            </div>
          </div>

          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-[#1a1206] rounded-xl shadow-2xl border-2 sm:border-4 border-[#4C1D00] overflow-hidden"
            style={{
              boxShadow: "0 0 30px rgba(232, 192, 104, 0.3), inset 0 0 20px rgba(0,0,0,0.5)",
            }}
          >
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Step 1: Team Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#E8C068] text-3d mb-4">Team Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#E8C068] font-bold mb-2 text-base sm:text-lg">Team Name</label>
                    <input
                      type="text"
                      name="teamName"
                      required
                      minLength={3}
                      maxLength={50}
                      value={team.teamName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                      placeholder="Enter your team name (3-50 characters)"
                    />
                  </div>
                  <div>
                    <label className="block text-[#E8C068] font-bold mb-2 text-lg">College Name</label>
                    <input
                      type="text"
                      name="collegeName"
                      required
                      minLength={3}
                      maxLength={100}
                      value={team.collegeName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                      placeholder="Leader's college name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#E8C068] font-bold mb-2 text-lg">Team Size</label>
                    <select
                      value={memberCount}
                      onChange={(e) => handleMemberCount(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                    >
                      {[4, 5].map((n) => (
                        <option key={n} value={n}>{n} Members</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Leader Info */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#E8C068] text-3d mb-4">Team Leader</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#E8C068] font-bold mb-2 text-lg">Leader Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      minLength={2}
                      maxLength={50}
                      pattern="[A-Za-z\s]+"
                      title="Please enter a valid name (letters and spaces only)"
                      placeholder="Full name"
                      value={team.leader.name}
                      onChange={(e) => handleChange(e, undefined, true)}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[#E8C068] font-bold mb-2 text-lg">Leader Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address"
                      placeholder="email@example.com"
                      value={team.leader.email}
                      onChange={(e) => handleChange(e, undefined, true)}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[#E8C068] font-bold mb-2 text-lg">Leader Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      title="Please enter a valid 10-digit phone number"
                      placeholder="10-digit phone number"
                      value={team.leader.phone}
                      onChange={(e) => handleChange(e, undefined, true)}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[#E8C068] font-bold mb-2 text-lg">Additional Contact</label>
                    <input
                      type="tel"
                      name="additionalPhone"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      title="Please enter a valid 10-digit phone number"
                      placeholder="10-digit phone number"
                      value={team.additionalPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Members Info */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#E8C068] text-3d mb-4">Team Members</h2>
                {team.members.map((member, idx) => (
                  <div key={idx} className="p-4 bg-[#0a0a0a] rounded-lg border-2 border-[#4C1D00] space-y-3">
                    <h3 className="text-xl font-bold text-[#FFD700]">Member {idx + 2}</h3>
                    <input
                      type="text"
                      name="name"
                      required
                      minLength={2}
                      maxLength={50}
                      pattern="[A-Za-z\s]+"
                      title="Please enter a valid name (letters and spaces only)"
                      placeholder={`Member ${idx + 2} Name`}
                      value={member.name}
                      onChange={(e) => handleChange(e, idx)}
                      className="w-full px-4 py-3 bg-[#1a1206] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address"
                      placeholder={`Member ${idx + 2} Email`}
                      value={member.email}
                      onChange={(e) => handleChange(e, idx)}
                      className="w-full px-4 py-3 bg-[#1a1206] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#E8C068] text-3d mb-4">Payment</h2>
                <div className="bg-[#0a0a0a] p-6 rounded-lg border-2 border-[#4C1D00] text-center">
                  <p className="text-[#E8C068] mb-4 text-lg">Scan the QR code below and upload payment screenshot</p>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white rounded-lg border-4 border-[#4C1D00]">
                      <img src="/upi.webp" alt="UPI QR Code" className="w-48 h-48 object-contain" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#E8C068] font-bold mb-2 text-lg">Transaction ID / UTR Number</label>
                    <input
                      type="text"
                      name="transactionId"
                      required
                      minLength={12}
                      maxLength={20}
                      pattern="[A-Za-z0-9]+"
                      title="Please enter a valid transaction ID (12-20 alphanumeric characters)"
                      placeholder="Enter UPI Transaction ID"
                      value={team.transactionId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1a1206] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all"
                    />
                  </div>
                  <label className="block text-[#E8C068] font-bold mb-2 text-lg">Upload Screenshot</label>
                  <input
                    type="file"
                    name="paymentScreenshot"
                    accept="image/*"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a1206] border-2 border-[#4C1D00] rounded-lg text-white focus:border-[#E8C068] focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#4C1D00] file:text-[#E8C068] file:font-bold hover:file:bg-[#6B2D00] file:cursor-pointer"
                  />
                  {fileError && (
                    <p className="mt-2 text-red-500 font-bold text-sm">{fileError}</p>
                  )}
                  <p className="mt-2 text-gray-400 text-xs">Maximum file size: 2MB</p>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="bg-[#0a0a0a] p-6 rounded-lg border-2 border-[#4C1D00]">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      checked={team.termsAccepted}
                      onChange={(e) => {
                        setTeam((prev) => ({ ...prev, termsAccepted: e.target.checked }));
                      }}
                      className="mt-1 w-5 h-5 cursor-pointer accent-[#E8C068] bg-[#1a1206] border-2 border-[#4C1D00] rounded"
                      required
                    />
                    <label htmlFor="termsCheckbox" className="text-[#E8C068] font-bold text-sm sm:text-base">
                      I have read and agree to the{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          playClickSound();
                          setShowTermsModal(true);
                        }}
                        className="underline hover:text-[#FFD700] transition-colors"
                      >
                        Terms and Conditions
                      </button>
                      {" "}of Hack Horizon 2.0
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-[#0a0a0a] p-4 sm:p-6 border-t-2 sm:border-t-4 border-[#4C1D00] flex justify-between items-center">
            {!success && currentStep > 1 && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  prevStep();
                }}
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm sm:text-base rounded-lg border-2 border-gray-900 transition-all transform hover:scale-105 active:scale-95"
                style={{
                  boxShadow: "0 4px 0 #1a1a1a, 0 8px 15px rgba(0,0,0,0.5)",
                }}
              >
                BACK
              </button>
            )}
            {!success && currentStep < totalSteps && (
              <button
                type="button"
                onClick={() => {
                  if (canProceedToNext()) {
                    playClickSound();
                    nextStep();
                  }
                }}
                disabled={!canProceedToNext()}
                className="ml-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-b from-[#FFD700] to-[#E8C068] hover:from-[#E8C068] hover:to-[#D4AF37] text-[#1a1206] font-bold text-sm sm:text-base rounded-lg border-2 border-[#4C1D00] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  boxShadow: "0 4px 0 #4C1D00, 0 8px 15px rgba(232,192,104,0.5)",
                  textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
                }}
                title={!canProceedToNext() ? "Please complete all fields correctly" : ""}
              >
                NEXT
              </button>
            )}
            {!success && currentStep === totalSteps && (
              <button
                type="submit"
                disabled={submitting}
                onClick={playClickSound}
                className="ml-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-b from-[#FFD700] to-[#E8C068] hover:from-[#E8C068] hover:to-[#D4AF37] text-[#1a1206] font-bold text-sm sm:text-base rounded-lg border-2 border-[#4C1D00] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: "0 4px 0 #4C1D00, 0 8px 15px rgba(232,192,104,0.5)",
                  textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
                }}
              >
                {submitting ? "SUBMITTING..." : "SUBMIT"}
              </button>
            )}
          </div>
        </form>
      </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => {
            playClickSound();
            setShowTermsModal(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-[#1a1206] to-[#0a0a0a] rounded-xl border-4 border-[#4C1D00] max-w-3xl w-full max-h-[80vh] overflow-hidden"
            style={{
              boxShadow: "0 0 40px rgba(232, 192, 104, 0.5), inset 0 0 30px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div className="bg-[#0a0a0a] p-4 sm:p-6 border-b-4 border-[#4C1D00] flex justify-between items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E8C068] text-3d">
                TERMS & CONDITIONS
              </h2>
              <button
                onClick={() => {
                  playClickSound();
                  setShowTermsModal(false);
                }}
                className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center"
                style={{
                  boxShadow: "0 4px 0 #7f1d1d",
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 max-h-[calc(80vh-200px)] overflow-y-auto custom-scrollbar">
              <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                <div className="bg-[#0a0a0a] p-4 rounded-lg border-2 border-[#4C1D00]">
                  <span className="text-[#FFD700] font-bold text-lg">Team Size:</span>
                  <p className="ml-4 mt-2">Teams must consist of a minimum of 3 and a maximum of 5 participants.</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded-lg border-2 border-[#4C1D00]">
                  <span className="text-[#FFD700] font-bold text-lg">Registration Fee:</span>
                  <p className="ml-4 mt-2">A non-refundable fee of <span className="text-[#E8C068] font-bold text-xl">₹800</span> per team is required for entry.</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded-lg border-2 border-[#4C1D00]">
                  <span className="text-[#FFD700] font-bold text-lg">Payment Proof:</span>
                  <p className="ml-4 mt-2">A clear screenshot or proof of payment must be attached during registration.</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded-lg border-2 border-[#4C1D00]">
                  <span className="text-[#FFD700] font-bold text-lg">Consent Form:</span>
                  <p className="ml-4 mt-2">Participants must bring their consent form filled in the form of Hard Copy.</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded-lg border-2 border-[#4C1D00]">
                  <span className="text-[#FFD700] font-bold text-lg">Eligibility:</span>
                  <p className="ml-4 mt-2">Participants must be currently enrolled university/college students.</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded-lg border-2 border-[#4C1D00]">
                  <span className="text-[#FFD700] font-bold text-lg">Originality:</span>
                  <p className="ml-4 mt-2">All submitted projects must be original work created entirely during the 24-hour hackathon period.</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded-lg border-2 border-[#4C1D00]">
                  <span className="text-[#FFD700] font-bold text-lg">Code of Conduct:</span>
                  <p className="ml-4 mt-2">All participants must adhere to the hackathon's Code of Conduct.</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded-lg border-2 border-[#4C1D00]">
                  <span className="text-[#FFD700] font-bold text-lg">Intellectual Property:</span>
                  <p className="ml-4 mt-2">Teams retain the intellectual property rights to their creations.</p>
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded-lg border-2 border-[#4C1D00]">
                  <span className="text-[#FFD700] font-bold text-lg">Judging:</span>
                  <p className="ml-4 mt-2">Judges' decisions are final and binding.</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0a0a0a] p-4 sm:p-6 border-t-4 border-[#4C1D00] flex justify-center">
              <button
                onClick={() => {
                  playClickSound();
                  setShowTermsModal(false);
                }}
                className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-b from-[#FFD700] to-[#E8C068] hover:from-[#E8C068] hover:to-[#D4AF37] text-[#1a1206] font-bold text-lg sm:text-xl rounded-lg border-2 border-[#4C1D00] transition-all transform hover:scale-105 active:scale-95"
                style={{
                  boxShadow: "0 6px 0 #4C1D00, 0 10px 20px rgba(232,192,104,0.5)",
                  textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
                }}
              >
                I UNDERSTAND
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}