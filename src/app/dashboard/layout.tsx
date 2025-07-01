'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter, usePathname } from 'next/navigation'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'


type MenuItem = {
  name: string
  href: string
  icon?: keyof typeof LucideIcons
  items: {
    name: string
    href: string
    icon?: keyof typeof LucideIcons
  }[]
}

const dashboardStats = {
  totalKaryawan: 52,
  tepatWaktu: 45,
  terlambat: 5,
  tidakHadir: 2
}

const attendanceData = [
  { name: 'Jan', hadir: 45, terlambat: 5, tidakHadir: 2 },
  { name: 'Feb', hadir: 42, terlambat: 8, tidakHadir: 3 },
  { name: 'Mar', hadir: 48, terlambat: 2, tidakHadir: 1 }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        const token = localStorage.getItem('authToken') || ''
        if (!token) {
          router.push('/login')
        } else {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [user, router])

  useEffect(() => {
    if (pathname) {
    const currentPath = pathname.split('/').pop() || 'dashboard'
    const activeItem = menuItems.find(item => 
      item.href?.includes(currentPath) || 
      item.items.some(subItem => subItem.href?.includes(currentPath))
    )
     if (activeItem) setActiveMenu(activeItem.name)
  }
}, [pathname])

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      icon: 'LayoutDashboard',
      href: '/dashboard',
      items: []
    },
    {
      name: 'Presensi',
      icon: 'CalendarCheck',
      href: '',
      items: [
        { name: 'Absensi', href: '/dashboard/presensi/absensi' },
        { name: 'History', href: '/dashboard/presensi/history' }
      ]
    },
    {
      name: 'Riwayat Absensi',
      icon: 'History',
      href: '/dashboard/riwayat',
      items: []
    },
    {
      name: 'Pegawai',
      icon: 'Users',
      href: '',
      items: [
        { name: 'Data', icon: 'UserCog', href: '/dashboard/pegawai/data' },
        { name: 'Jabatan', icon: 'Briefcase', href: '/dashboard/pegawai/jabatan' }
      ]
    },
    {
      name: 'Pengaturan',
      icon: 'Settings',
      href: '/dashboard/pengaturan',
      items: []
    }
  ]

  const renderIcon = (iconName?: keyof typeof LucideIcons, props?: LucideProps) => {
    if (!iconName) return null
    const IconComponent = LucideIcons[iconName] as React.ComponentType<LucideProps>
    return <IconComponent {...props} />
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    logout()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0d0d0d]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBF991]"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#0d0d0d]/95 text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#0d0d0d] border-r border-[#4A5568] flex flex-col">
        {/* Header Sidebar */}
        <div className="p-4 border-b border-[#4A5568]">
          <h2 className="text-lg font-bold text-white capitalize">
            {user?.role} Dashboard
          </h2>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-400">@{user?.username}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Navigasi Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.items.length > 0 ? (
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex items-center justify-between w-full p-2 rounded hover:bg-gray-800 ${
                          activeMenu === item.name ? 'bg-gray-800' : ''
                        }`}
                        onClick={() => setActiveMenu(item.name)}
                      >
                        <div className="flex items-center">
                          {item.icon && renderIcon(item.icon, { className: "h-4 w-4" })}
                          <span className="ml-2">{item.name}</span>
                        </div>
                        <ChevronDownIcon
                          className={`${open ? 'transform rotate-180' : ''} h-4 w-4`}
                        />
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="ml-6 space-y-1">
                          {item.items.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center p-2 text-sm rounded hover:bg-gray-800"
                              onClick={(e) => {
                                e.preventDefault()
                                router.push(subItem.href)
                                setActiveMenu(item.name)
                              }}
                            >
                              {subItem.icon && renderIcon(subItem.icon, { className: "h-4 w-4" })}
                              <span className={`${subItem.icon ? 'ml-2' : 'ml-6'}`}>
                                {subItem.name}
                              </span>
                            </a>
                          ))}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ) : (
                <a
                  href={item.href}
                  className={`flex items-center p-2 rounded hover:bg-gray-800 ${
                    activeMenu === item.name ? 'bg-gray-800' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(item.href)
                    setActiveMenu(item.name)
                  }}
                >
                  {item.icon && renderIcon(item.icon, { className: "h-4 w-4" })}
                  <span className="ml-2">{item.name}</span>
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Footer Sidebar - Logout */}
        <div className="p-4 border-t border-[#4A5568]">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 rounded hover:bg-gray-800"
          >
            {renderIcon('LogOut', { className: "h-4 w-4" })}
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#1a1a1a] p-4 border-b border-[#4A5568]">
          <h1 className="text-xl font-semibold">
            {activeMenu || 'Dashboard'}
          </h1>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-[#0d0d0d]/95">
          {activeMenu === 'Dashboard' ? (
            <div className="space-y-6">
              {/* Statistik */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total Karyawan */}
                <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400">Total Karyawan</p>
                      <h2 className="text-2xl font-bold">{dashboardStats.totalKaryawan}</h2>
                    </div>
                    {renderIcon('Users', { className: "h-8 w-8 text-blue-400" })}
                  </div>
                </div>

                {/* Tepat Waktu */}
                <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400">Tepat Waktu</p>
                      <h2 className="text-2xl font-bold">{dashboardStats.tepatWaktu}</h2>
                    </div>
                    {renderIcon('CheckCircle', { className: "h-8 w-8 text-green-400" })}
                  </div>
                </div>

                {/* Terlambat */}
                <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400">Terlambat</p>
                      <h2 className="text-2xl font-bold">{dashboardStats.terlambat}</h2>
                    </div>
                    {renderIcon('Clock', { className: "h-8 w-8 text-yellow-400" })}
                  </div>
                </div>

                {/* Tidak Hadir */}
                <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-red-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400">Tidak Hadir</p>
                      <h2 className="text-2xl font-bold">{dashboardStats.tidakHadir}</h2>
                    </div>
                    {renderIcon('UserX', { className: "h-8 w-8 text-red-400" })}
                  </div>
                </div>
              </div>

              {/* Grafik Kehadiran */}
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Grafik Kehadiran Karyawan</h2>
                  <div className="flex items-center space-x-2">
                    {renderIcon('PieChart', { className: "h-5 w-5" })}
                    <span>2023</span>
                  </div>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#a0aec0" 
                        tick={{ fill: '#a0aec0' }}
                      />
                      <YAxis 
                        stroke="#a0aec0" 
                        tick={{ fill: '#a0aec0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a',
                          borderColor: '#4A5568',
                          borderRadius: '0.25rem'
                        }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="hadir" 
                        fill="#48bb78" 
                        name="Hadir" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="terlambat" 
                        fill="#ecc94b" 
                        name="Terlambat" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="tidakHadir" 
                        fill="#f56565" 
                        name="Tidak Hadir" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  )
}