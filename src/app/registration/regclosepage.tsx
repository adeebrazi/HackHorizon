"use client";

import { motion } from "framer-motion";
import Audio from "@/components/ui/Audio";

export default function RegistrationForm() {
  return (
    <div
      className="min-h-screen bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center"
      suppressHydrationWarning
    >
      {/* Audio Component */}
      <Audio />

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,0,0.3),transparent_50%)]" />

      {/* Registration Closed Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <div className="bg-gradient-to-b from-[#1a1206] to-[#0a0a0a] rounded-2xl shadow-2xl border-4 border-[#4C1D00] p-8 md:p-12 text-center">
          {/* Lock Icon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6"
          >
            <svg
              className="w-24 h-24 md:w-32 md:h-32 mx-auto text-[#FFD700] drop-shadow-lg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1C6.48 1 2 5.48 2 11v10c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V11c0-5.52-4.48-10-10-10zm0 2c4.41 0 8 3.59 8 8v2H4v-2c0-4.41 3.59-8 8-8zm-4 12h8v4H8z" />
              <path d="M13 17h-2v2h2z" />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E8C068] mb-4"
            style={{
              textShadow:
                "2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(232,192,104,0.3)",
            }}
          >
            REGISTRATION CLOSED
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed"
          >
            The registration for{" "}
            <span className="text-[#FFD700] font-bold">HackHorizon 2.0</span>{" "}
            has been closed.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-base md:text-lg text-gray-400 mb-8"
          >
            Thank you for your interest! We can't wait to see you at the event.
          </motion.p>

          {/* Home Button */}
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            href="/"
            className="inline-block px-8 md:px-12 py-4 bg-gradient-to-b from-[#FFD700] to-[#E8C068] hover:from-[#E8C068] hover:to-[#D4AF37] text-[#1a1206] font-bold text-lg md:text-xl rounded-lg border-2 border-[#4C1D00] transition-all transform hover:scale-105 active:scale-95"
            style={{
              boxShadow: "0 6px 0 #4C1D00, 0 10px 20px rgba(232,192,104,0.5)",
              textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
            }}
          >
            BACK TO HOME
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
