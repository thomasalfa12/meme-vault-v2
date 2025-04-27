export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left text-gray-600 text-sm">
          © {new Date().getFullYear()} Meme Vault. All rights reserved.
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            Twitter
          </a>
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            Discord
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
