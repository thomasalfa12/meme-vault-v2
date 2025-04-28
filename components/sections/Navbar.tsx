import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">aPriori</h1>
        <Link href="/campaign">
          <button className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:brightness-125 transition">
            Campaign
          </button>
        </Link>
      </div>
    </nav>
  );
}
