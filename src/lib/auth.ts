// import { cookies } from 'next/headers'

// export async function createSession(userId: string) {
//   cookies().set('session', userId, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24 * 7, // 1 week
//     path: '/',
//   })
// }

// export async function getCurrentUser() {
//   const session = cookies().get('session')?.value
//   // ... logika get user dari database
// }