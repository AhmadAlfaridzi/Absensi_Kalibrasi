import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false
};

export default nextConfig;



// // next.config.ts
// import type { NextConfig } from 'next'
// import ngrok from '@ngrok/ngrok'

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   // Konfigurasi lainnya...
// }

// // Fungsi untuk memulai ngrok tunnel
// async function setupNgrok() {
//   try {
//     const listener = await ngrok.connect({
//       authtoken: process.env.NGROK_AUTH_TOKEN,
//       addr: parseInt(process.env.PORT || '3000'),
//       region: 'ap'
//     })
//     console.log('Ngrok Tunnel URL:', listener.url())
//   } catch (err) {
//     console.error('Failed to start ngrok:', err)
//   }
// }

// // Jalankan hanya di development
// if (process.env.NODE_ENV === 'development') {
//   setupNgrok()
// }

// export default nextConfig
