'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import HistoryTable from '@/components/presensi/historyTable'
import UserInfo from '@/components/presensi/userInfo'

export default function HistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  const [currentDate] = useState(new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }))

  const [realTime] = useState(
    new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  )

  const attendanceHistory = [
    { date: '2023-10-01', clockIn: '08:00', clockOut: '17:00', status: 'Tepat Waktu' as const },
    { date: '2023-10-02', clockIn: '08:15', clockOut: '17:10', status: 'Terlambat' as const },
    { date: '2023-10-03', clockIn: '07:55', clockOut: '16:45', status: 'Tepat Waktu' as const },
    { date: '2023-10-04', clockIn: '08:05', clockOut: '17:05', status: 'Tepat Waktu' as const },
    { date: '2023-10-05', clockIn: '08:20', clockOut: '17:15', status: 'Terlambat' as const }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBF991]" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6 bg-[#1a1a1a] min-h-screen text-white"
    >
      {isMobile && (
        <Button 
          variant="ghost"
          onClick={handleBackClick}
          className="text-blue-400 hover:text-blue-300 mb-6 bg-[#2a2a2a] hover:bg-[#333333] md:hidden"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali ke Dashboard
        </Button>
      )}

      <UserInfo 
        user={user} 
        realTime={realTime} 
        currentDate={currentDate} 
      />

      <Card className="bg-[#2a2a2a] border-[#333333]">
        <HistoryTable data={attendanceHistory} />
      </Card>
    </motion.div>
  )
}