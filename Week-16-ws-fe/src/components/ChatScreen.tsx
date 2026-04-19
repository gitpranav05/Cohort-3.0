import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types";

interface ChatScreenProps {
  roomId: string;
  messages: ChatMessage[];
  mySenderId: string;
  inputValue: string;
  setInputValue: (val: string) => void;
  onSend: (e: React.FormEvent) => void;
  onLeave: () => void;
}

export function ChatScreen({
  roomId,
  messages,
  mySenderId,
  inputValue,
  setInputValue,
  onSend,
  onLeave,
}: ChatScreenProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[100dvh] w-full bg-neutral-950 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-purple-600/10 blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          <h1 className="text-lg font-semibold text-white">
            <span className="text-neutral-400 font-normal mr-2">Room /</span>
            {roomId}
          </h1>
        </div>
        <button
          onClick={onLeave}
          className="px-4 py-1.5 text-sm font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
        >
          Leave
        </button>
      </header>
      

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-6 z-0">
        <div className="max-w-4xl mx-auto flex flex-col">
          {messages.length === 0 ? (
            <div className="text-center py-20 text-neutral-500">
              <p>No messages yet. Say hello!</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMine = msg.senderId === mySenderId;
              const isSameSenderAsPrev =
                index > 0 && messages[index - 1].senderId === msg.senderId;

              return (
                <div
                  key={index}
                  className={`flex flex-col animate-in slide-in-from-bottom-2 fade-in duration-300 ${
                    isMine ? "items-end" : "items-start"
                  } ${isSameSenderAsPrev ? "mt-1" : ""}`}
                >
                  {!isSameSenderAsPrev && (
                    <div
                      className={`text-xs mb-1 px-1 text-neutral-400 ${
                        isMine ? "text-right" : "text-left"
                      }`}
                    >
                      {isMine ? "You" : msg.name}
                    </div>
                  )}
                  <div
                    className={`px-5 py-3 text-neutral-100 max-w-[85%] sm:max-w-[70%] border shadow-sm break-words ${
                      isMine
                        ? `rounded-2xl ${
                            isSameSenderAsPrev ? "rounded-tr-2xl" : "rounded-tr-sm"
                          } bg-purple-600 border-purple-500`
                        : `rounded-2xl ${
                            isSameSenderAsPrev ? "rounded-tl-2xl" : "rounded-tl-sm"
                          } bg-white/10 border-white/5`
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-4 sm:p-6 border-t border-white/10 bg-black/40 backdrop-blur-md z-10">
        <form onSubmit={onSend} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-5 py-3.5 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-purple-500 rounded-2xl text-white placeholder-neutral-500 focus:outline-none transition-all"
            autoFocus
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-6 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-purple-500/25 active:scale-[0.98] flex items-center justify-center min-w-[100px] cursor-pointer"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
