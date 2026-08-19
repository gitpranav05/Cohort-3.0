"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="flex w-screen h-screen rounded-2xl justify-center items-center">
      <input
        value={roomId}
        type="text"
        className="border-amber-50 border-2  rounded-2xl p-5"
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
        placeholder="Room-Id"
      />

      <button
        className="bg-gray-300 cursor-pointer text-gray-700 rounded-2xl p-5"
        onClick={() => {
          router.push(`/room/${roomId}`);
        }}
      >
        Join Room
      </button>
    </div>
  );
}
