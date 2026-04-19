import React from "react";

interface JoinScreenProps {
  userName: string;
  setUserName: (name: string) => void;
  roomId: string;
  setRoomId: (id: string) => void;
  onJoin: (e: React.FormEvent) => void;
}

export function JoinScreen({
  userName,
  setUserName,
  roomId,
  setRoomId,
  onJoin,
}: JoinScreenProps) {
  return (
    <div className="h-screen w-full bg-neutral-950 flex items-center justify-center font-sans">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
      </div>

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Join a Room
          </h1>
          <p className="text-neutral-400 text-sm">
            Enter your name and a room ID
          </p>
        </div>

        <form onSubmit={onJoin} className="space-y-4">
          <div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name (e.g. Alice)"
              className="w-full px-4 py-3 mb-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Room ID (e.g. general)"
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 active:scale-[0.98] cursor-pointer"
          >
            Enter Room
          </button>
        </form>
      </div>
    </div>
  );
}
