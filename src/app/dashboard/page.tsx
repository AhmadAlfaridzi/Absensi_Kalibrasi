'use client'

import { useAuth } from '@/context/authContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { redirect } from 'next/navigation'

type RoleContent = {
  title: string
  stats: {
    title: string
    value: string
    icon: string
  }[]
}

const DEFAULT_CONTENT: RoleContent = {
  title: "Dashboard Overview",
  stats: [
    { title: "Activities", value: "0", icon: "📊" },
    { title: "Notifications", value: "0", icon: "🔔" }
  ]
}

const ROLE_CONTENT: Record<string, RoleContent> = {
  admin: {
    title: "Administrator Overview",
    stats: [
      { title: "Total Users", value: "1,234", icon: "👥" },
      { title: "System Health", value: "Optimal", icon: "✅" }
    ]
  },
  Owner: {
    title: "Business Overview",
    stats: [
      { title: "Revenue", value: "Rp 250M", icon: "💰" },
      { title: "Profit Margin", value: "32%", icon: "📈" }
    ]
  },
  Direktur: {
    title: "Operational Dashboard",
    stats: [
      { title: "Active Projects", value: "24", icon: "🏗️" },
      { title: "Productivity", value: "87%", icon: "⚡" }
    ]
  },
  karyawan: {
    title: "My Dashboard",
    stats: [
      { title: "Tasks Due", value: "5", icon: "📝" },
      { title: "Completed", value: "12", icon: "✔️" }
    ]
  }
}

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    redirect('/login')
  }

  const getRoleContent = (): RoleContent => {
    return ROLE_CONTENT[user.role] || DEFAULT_CONTENT
  }

  const roleContent = getRoleContent()

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">{roleContent.title}</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roleContent.stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <span className="text-2xl">{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded">
              <div className="bg-[#0d0d0d]/10 p-2 rounded-full">
                <span>📅</span>
              </div>
              <div>
                <p className="font-medium">System updated</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}