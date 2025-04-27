"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-white font-bold text-2xl">MemeVault 🔑</div>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
}
