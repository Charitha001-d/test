// components/Chatbot.tsx
import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! I'm your Aloe assistant 🌿" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simple dummy reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Thanks for your message! We'll help you with Aloe care soon.",
        },
      ]);
    }, 500);
  };

  return (
    <>
      {/* Chat icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-[90px] right-4 w-10 h-10 transition-transform duration-300 hover:scale-110 hover:drop-shadow-xl"
      >
        <img 
        src="/icons/chatbot (2).png" 
        alt="Bot Icon" 
        className="w-15 h-15shadow-lg" 
      />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-[150px] right-4 w-72 bg-white border border-gray-300 rounded-xl shadow-lg z-30 flex flex-col max-h-[350px] overflow-hidden">
          <div className="bg-[#1c8567] text-white px-4 py-2 font-semibold">
            Aloe Bot 🌱
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm bg-[#f6f6f6]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.from === "bot"
                    ? "text-left text-gray-800"
                    : "text-right text-green-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex items-center border-t px-2 py-1 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-sm px-2 py-1 outline-none"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="text-[#1c8567] hover:text-[#063528] px-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
