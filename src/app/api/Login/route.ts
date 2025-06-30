// import { NextResponse } from 'next/server'
// // import bcrypt from 'bcryptjs'
// // import prisma from '@/lib/prisma' // Contoh koneksi database

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json()

//     // 1. Cari user di database
//     const user = await prisma.user.findUnique({
//       where: { email }
//     })

//     if (!user) {
//       return NextResponse.json(
//         { message: 'Email atau password salah' },
//         { status: 401 }
//       )
//     }

//     // 2. Verifikasi password
//     const passwordValid = await bcrypt.compare(password, user.password)
//     if (!passwordValid) {
//       return NextResponse.json(
//         { message: 'Email atau password salah' },
//         { status: 401 }
//       )
//     }

//     // 3. Return data user (tanpa password)
//     const { password: _, ...userWithoutPassword } = user
    
//     return NextResponse.json({
//       success: true,
//       user: userWithoutPassword
//     })

//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Terjadi kesalahan server' },
//       { status: 500 }
//     )
//   }
// }