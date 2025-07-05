// // pages/api/tunnel.ts
// import ngrok from '@ngrok/ngrok'
// import type { NextApiRequest, NextApiResponse } from 'next'

// let ngrokListener: ngrok.NgrokTunnel | null = null

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'GET') {
//     if (!ngrokListener) {
//       try {
//         ngrokListener = await ngrok.connect({
//           authtoken: process.env.NGROK_AUTH_TOKEN,
//           addr: parseInt(process.env.PORT || '3000'),
//           region: 'ap'
//         })
//         return res.json({ 
//           status: 'connected',
//           url: ngrokListener.url() 
//         })
//       } catch (err) {
//         return res.status(500).json({ 
//           error: err instanceof Error ? err.message : 'Unknown error' 
//         })
//       }
//     }
//     return res.json({ 
//       status: 'already connected',
//       url: ngrokListener.url() 
//     })
//   }

//   if (req.method === 'DELETE') {
//     if (ngrokListener) {
//       await ngrokListener.close()
//       ngrokListener = null
//       return res.json({ status: 'disconnected' })
//     }
//     return res.status(404).json({ error: 'No active connection' })
//   }

//   res.setHeader('Allow', ['GET', 'DELETE'])
//   res.status(405).end('Method Not Allowed')
// }