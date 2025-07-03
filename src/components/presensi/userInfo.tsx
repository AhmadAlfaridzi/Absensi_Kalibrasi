'use client'
import { Card, CardHeader } from '@/components/ui/card'
import { Clock, Calendar } from 'lucide-react'

interface User {
  name: string
  position: string
  department: string
}

interface UserInfoProps {
  user: User
  realTime: string
  currentDate: string
}

export default function UserInfo({ user, realTime, currentDate }: UserInfoProps) {
  return (
    <Card className="bg-[#2a2a2a] border-[#333333] mb-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-400">{user.position}</p>
            <p className="text-sm text-gray-500">{user.department}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-lg text-white">{realTime}</span>
            </div>
            <div className="flex items-center mt-2">
              <Calendar className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-gray-400">{currentDate}</span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}