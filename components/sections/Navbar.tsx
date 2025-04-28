import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-[#090E1A] border-b border-gray-700 w-full">
      {/* Left - Logo & Menu */}
      <div className="flex items-center space-x-2">
        <button className="text-white mr-2 md:hidden" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <h1 className="text-white font-bold text-lg hidden md:block">
          Meme Vault
        </h1>
      </div>

      {/* Center - Search */}
      <div
        className={`flex-1 mx-2 md:mx-6 transition-all duration-300 ${
          isSearchOpen ? "max-w-md" : "max-w-0 overflow-hidden"
        }`}
      >
        <input
          type="text"
          placeholder="Search campaigns..."
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />
      </div>

      {/* Right - Create & Connect Wallet */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="text-white text-xl focus:outline-none"
        >
          🔍
        </button>

        <Link href="/create-campaign">
          <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-full transition">
            Create
          </button>
        </Link>

        <ConnectButton showBalance={false} accountStatus="address" />
      </div>
    </nav>
  );
};

export default Navbar;
