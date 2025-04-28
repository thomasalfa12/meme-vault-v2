import { useSidebar } from "../context/SidebarContext";
import {
  FaTelegramPlane,
  FaTwitter,
  FaDiscord,
  FaFire,
  FaCoins,
  FaClock,
  FaChartLine,
  FaVolumeUp,
  FaCalendarAlt,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const navItems = [
  { label: "Live", icon: <FaFire /> },
  { label: "All Coins", icon: <FaCoins /> },
  { label: "New", icon: <FaClock /> },
  { label: "Top Performers", icon: <FaChartLine /> },
  { label: "High Volume", icon: <FaVolumeUp /> },
  { label: "Scheduled", icon: <FaCalendarAlt /> },
];

export default function Sidebar() {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#0E1320] text-white z-40
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between p-4">
              {!collapsed && <span className="text-lg font-bold">Menu</span>}
              <button
                className="text-white"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setMobileOpen(false); // Close sidebar mobile
                  } else {
                    setCollapsed(!collapsed); // Toggle collapse desktop
                  }
                }}
              >
                <FiMenu size={20} />
              </button>
            </div>

            {/* Links */}
            <nav>
              <ul className="space-y-2 p-2">
                {navItems.map(({ label, icon }) => (
                  <li
                    key={label}
                    className="flex items-center space-x-3 p-2 rounded cursor-pointer text-sm hover:bg-[#1a1f2e] transition-all"
                  >
                    <span className="text-lg">{icon}</span>
                    {!collapsed && <span>{label}</span>}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
}
