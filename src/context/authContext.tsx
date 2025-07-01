'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export type UserRole = 'admin' | 'Owner' | 'Direktur' | 'karyawan'

interface User {
  id: string
  name: string
  username: string
  email: string
  role: UserRole
  image?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

const login = async (username: string, password: string) => {
  const users: User[] = [
    { id: '1', name: 'Admin', username: 'admin1', email: 'admin@example.com', role: 'admin' },
    { id: '2', name: 'Owner', username: 'owner1', email: 'owner@example.com', role: 'Owner' },
    { id: '3', name: 'Direktur', username: 'direktur1', email: 'direktur@example.com', role: 'Direktur' },
    { id: '4', name: 'Karyawan', username: 'karyawan1', email: 'karyawan@example.com', role: 'karyawan' }
  ];

  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const foundUser = users.find(u => u.username === username && password === '123456')
      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem('user', JSON.stringify(foundUser))
        resolve() // Resolve tanpa return value
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}