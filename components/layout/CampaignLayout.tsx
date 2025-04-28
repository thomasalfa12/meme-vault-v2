import Navbar from "../sections/Navbar";
import Sidebar from "../sections/Sidebar";
import { useSidebar } from "../context/SidebarContext";

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-[#090E1A] relative">
      <Sidebar />

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <div
        className={`flex flex-col flex-1 transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        <Navbar toggleSidebar={() => setMobileOpen(true)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
