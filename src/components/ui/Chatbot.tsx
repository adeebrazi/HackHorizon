"use client"; // 🔥 CRITICAL for Next.js App Router

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { X, Send, Paperclip, Maximize2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { usePathname } from "next/navigation";

// --- TYPES FOR TYPESCRIPT ---
interface Message {
  role: "user" | "bot";
  text: string;
}

interface UserData {
  name: string;
  teamName: string;
  teamCode: string;
  email: string;
}

const MessageContent = ({
  text,
  isUser,
}: {
  text: string;
  isUser: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderMarkdown = (content: string) => (
    <ReactMarkdown
      components={{
        strong: ({ ...props }) => (
          <span
            className="font-extrabold text-yellow-400 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]"
            {...props}
          />
        ),
        ul: ({ ...props }) => (
          <ul className="list-disc ml-5 space-y-1" {...props} />
        ),
        code: ({ ...props }) => (
          <code
            className="bg-black/60 p-1 rounded font-mono text-xs border border-white/10 block my-2 whitespace-pre-wrap"
            {...props}
          />
        ),
        p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );

  if (isUser)
    return (
      <div className="font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] whitespace-pre-wrap text-white">
        {text}
      </div>
    );

  const hasSplit = text.includes("READ_MORE_SPLIT");
  const parts = hasSplit ? text.split("READ_MORE_SPLIT") : [text];

  return (
    <div className="text-white relative z-20">
      <div className="font-extrabold drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)]">
        {renderMarkdown(parts[0])}
      </div>
      {hasSplit && isExpanded && parts[1] && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 pt-2 border-t border-yellow-900/40 text-gray-100 font-medium text-xs"
        >
          {renderMarkdown(parts[1])}
        </motion.div>
      )}
      {hasSplit && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-yellow-400 font-black text-[10px] uppercase tracking-tighter hover:text-white mt-1 block outline-none cursor-pointer bg-transparent border-none"
        >
          {isExpanded ? "REDUCE LOGS ↑" : "EXPAND SCHEMATICS ↓"}
        </button>
      )}
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    teamName: "",
    teamCode: "",
    email: "",
  });
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Greeting, Chief! **Horizon Bot** (O.T.T.O Unit) online. Awaiting build orders. ⚙️",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToBottom = () =>
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const pathname = usePathname();
  if (pathname === "/registration" || !isLoaded) return null;

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;
    const displayMsg = selectedFile
      ? `📁 Schematics: ${selectedFile.name}\n${input}`
      : input;
    setMessages((prev) => [...prev, { role: "user", text: displayMsg }]);

    const currentInput = input;
    const fileToSend = selectedFile;

    setInput("");
    setSelectedFile(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", currentInput);
      formData.append("teamCode", userData.teamCode);
      formData.append("email", userData.email);
      if (fileToSend) formData.append("file", fileToSend);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_CHAT_API}/api/chat`,
        formData,
      );
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Circuit malfunction! Try again, Chief! 💀" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-25 z-45 font-sans">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent border-none p-0 outline-none cursor-pointer"
      >
        {isOpen ? (
          <div className="bg-[#4aa312] border-b-4 border-[#2d620b] p-4 rounded-2xl text-white shadow-2xl">
            <X size={32} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src="/O.T.T.O_info.png"
              alt="HackHorizon Bot"
              className="w-24 h-24 object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            />
            <span className="font-black italic text-[11px] text-white uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,1)] -mt-2">
              HORIZON BOT
            </span>
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`absolute bottom-32 right-0 border-[6px] border-[#4e3115] shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${isFull ? "w-[90vw] h-[85vh]" : "w-80 sm:w-96 h-125"}`}
          >
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url('/Clash-of-Clans-October-2025-Update.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 1,
              }}
            />

            <div className="relative z-30 p-3 bg-[#8b5a2b] border-b-4 border-[#4e3115] text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-2">
                <img
                  src="/aju-naac-logo-dark.png"
                  alt="AJU"
                  className="h-8 object-contain"
                />
                <img
                  src="/logo.jpg"
                  alt="Horizon"
                  className="h-8 w-8 rounded-full border border-yellow-400 shadow-md"
                />
                <div className="ml-1">
                  <h3 className="text-white font-black italic tracking-tighter text-sm sm:text-base leading-none drop-shadow-[0_2px_0_rgba(0,0,0,1)]"></h3>
                  <p className="text-[9px] uppercase font-black text-yellow-400 tracking-widest drop-shadow-sm"></p>
                </div>
              </div>
              {/* <button onClick={() => setIsFull(!isFull)} className="bg-[#4e3115] p-2 rounded-xl active:scale-95 transition"><Maximize2 size={16}/></button> */}
            </div>

            <div className="relative z-20 flex-1 overflow-y-auto p-4 space-y-4">
              {step === 1 ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (userData.name && userData.teamCode) setStep(2);
                  }}
                  className="space-y-4 pt-4"
                >
                  {["name", "teamName", "teamCode", "email"].map((f) => (
                    <input
                      key={f}
                      required
                      placeholder={f.toUpperCase()}
                      className="w-full p-3 sm:p-4 rounded-2xl bg-white border-b-4 border-gray-300 text-black font-extrabold outline-none focus:border-yellow-500 shadow-inner"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          [f as keyof UserData]: e.target.value,
                        })
                      }
                    />
                  ))}
                  <button className="w-full bg-[#4aa312] border-b-4 border-[#2d620b] text-white p-4 rounded-2xl font-black text-lg tracking-widest shadow-lg active:scale-95 transition">
                    INITIALIZE
                  </button>
                </form>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {m.role === "bot" && (
                        <img
                          src="/O.T.T.O_info.png"
                          alt="OTTO"
                          className="w-8 h-8 rounded-full border-2 border-[#4e3115] bg-[#8b5a2b] object-contain shadow-sm mb-1 shrink-0"
                        />
                      )}
                      <div
                        className={`max-w-[80%] p-3 px-4 rounded-2xl text-xs shadow-[0_4px_0_rgba(0,0,0,0.3)] ${m.role === "user" ? "bg-[#1e4eb8] border-b-4 border-[#0e2a6d] text-white rounded-tr-none" : "bg-[#7c4d25] border-b-4 border-[#4e3115] text-white rounded-tl-none"}`}
                      >
                        <MessageContent
                          text={m.text}
                          isUser={m.role === "user"}
                        />
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="text-white font-black italic text-[10px] drop-shadow-md animate-pulse ml-10">
                      ⚙️ O.T.T.O WORKING...
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {step === 2 && (
              <div className="relative z-30 p-3 bg-[#4e3115]/95 border-t-2 border-[#8b5a2b] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer bg-[#8b5a2b] p-2 rounded-xl border-b-4 border-[#3a2510] active:scale-90 shrink-0">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files && setSelectedFile(e.target.files[0])
                      }
                    />
                    <Paperclip size={18} className="text-white" />
                  </label>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Specs..."
                    className="flex-1 min-w-0 bg-white border-b-4 border-gray-300 p-2 rounded-xl text-black font-extrabold text-xs outline-none focus:border-yellow-500 shadow-inner"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-[#4aa312] text-white p-2 px-4 rounded-xl border-b-4 border-[#2d620b] font-black text-sm shrink-0 active:scale-95 transition shadow-lg"
                  >
                    SEND
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
