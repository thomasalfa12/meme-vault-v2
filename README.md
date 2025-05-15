# 🧠 monaunch.fun - Launchpad Meme dengan FHE & Uniswap V4 Hooks

MemeVault v2 adalah platform **launchpad meme Web3** inovatif dengan keunggulan utama yaitu integrasi **Uniswap v4 AMM & Custom Hooks** yang powerful dan fleksibel. Proyek ini dibangun untuk jaringan **Monad** sebagai target utama, namun saat ini sedang **dideploy pada Base Sepolia** karena **Monad belum mendukung Uniswap v4 Hooks** sepenuhnya.

---

## ✨ Fitur Utama

- 🔥 **Buat kampanye meme dengan smart contract**: siapa pun bisa memulai token meme dan membangun komunitasnya.
- 🧩 **Integrasi Uniswap v4 dengan Custom Hooks**: otomatisasi LP, fee share, dan burn dengan fitur canggih dari Uniswap v4.
- 🎛️ **Mode Simple**:
  - Buat token otomatis
  - Pasang liquidity (LP) + auto burn
  - Dapatkan fee sharing: 85% Creator / 15% Burn
- 🧪 **Mode Advanced**:
  - Kustomisasi fee sharing
  - Konfigurasi degen-mode untuk komunitas
- 🔒 **Privasi tingkat lanjut** dengan teknologi **Fully Homomorphic Encryption (FHE)** dari Inco Network.
- 🌐 **Integrasi WalletConnect v2 & RainbowKit** untuk pengalaman pengguna yang seamless.

---

## ⚙️ Stack Teknologi

- [Next.js](https://nextjs.org/)
- [RainbowKit](https://www.rainbowkit.com/) + [wagmi](https://wagmi.sh/) + [WalletConnect v2](https://walletconnect.com/)
- [Uniswap v4](https://uniswap.org/blog/uniswap-v4) (dengan Custom Hooks)
- [Inco Network](https://inco.xyz/) untuk privasi melalui FHE
- [IPFS Upload via Infura](https://infura.io/)
- Target utama: [Monad L1](https://monad.xyz/) – modular, parallel, high-performance EVM chain

---

## 🌍 Status Saat Ini

🚧 **Sedang dideploy di jaringan Base Sepolia** untuk test awal dan integrasi Uniswap v4.  
🧪 **Deploy ke Monad testnet** akan dilakukan setelah **dukungan Uniswap v4 Hooks tersedia** di jaringan Monad.

---

## 📈 Roadmap

### ✅ Tahap Saat Ini
- [x] Integrasi Uniswap v4 + Hooks di Base Sepolia
- [x] Mode Simple dan Advanced dalam pembuatan kampanye
- [x] Implementasi FHE untuk privasi kampanye & user
- [x] Upload metadata/token info ke IPFS

### 🔜 Berikutnya
- [ ] **Deploy penuh ke Monad Testnet**
- [ ] **Integrasi Uniswap v4 secara penuh di Monad (saat hooks sudah didukung)**
- [ ] Penambahan fitur trending token & komunitas voting
- [ ] Optimasi gas & kecepatan eksekusi untuk pengguna degen
- [ ] Fitur campaign leaderboard & on-chain voting

### 💡 Rencana Masa Depan
- [ ] Integrasi Telegram/Discord Bot untuk notifikasi kampanye
- [ ] Creator analytics dashboard
- [ ] Mode stealth launch & private group support
- [ ] Mobile-friendly UI & WalletConnect QR

---

## 🧪 Jalankan Lokal

```bash
# Install dependency
npm install

# Jalankan server dev
npm run dev

# Buka di browser
http://localhost:3000
