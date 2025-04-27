import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-indigo-600 to-purple-800 text-white text-center py-20 px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Unlock Secret Memes 🔒
      </h1>
      <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8">
        Fund, Predict, and Earn. Support meme creators and get early rewards!
      </p>
      <Link href="/create-campaign">
        <div className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer">
          Create Campaign 🚀
        </div>
      </Link>
    </section>
  );
}
