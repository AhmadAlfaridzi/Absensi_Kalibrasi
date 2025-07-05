import { createServer } from 'https'
import { parse } from 'url'
import next from 'next'
// import fs from 'fs'
// import path from 'path'
import selfsigned from 'selfsigned'
import os from 'os'

// Generate self-signed certificate
const certs = selfsigned.generate([
  { name: 'commonName', value: 'localhost' }
], { days: 365 })

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(
    {
      key: certs.private,
      cert: certs.cert,
    },
    (req, res) => {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    }
  ).listen(port, hostname, (err) => {
    if (err) throw err
    console.log(`
      > Server ready on:
      - https://localhost:${port}
      - https://${getLocalIpAddress()}:${port}
    `)
  })
})

// Helper untuk mendapatkan IP lokal
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}