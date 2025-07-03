'use client'
import { useMemo, useState, useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { 
  ChevronDownIcon,
  LayoutDashboard,
  CalendarCheck,
  History,
  Mail,
  FileText,
  Users,
  Box,
  Settings,
  LogOut,
  Briefcase,
  Wrench,
  Package,
  LogIn
} from 'lucide-react'
import { SmoothTransition } from '@/components/ui/smooth-transition'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

type MenuItem = {
  name: string
  href: string
  icon?: React.ReactNode
  items: {
    name: string
    href: string
    icon?: React.ReactNode
  }[]
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])

  const menuItems: MenuItem[] = useMemo(() => [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5 text-blue-400" />,
      href: '/dashboard',
      items: []
    },
    {
      name: 'Presensi',
      icon: <CalendarCheck className="h-5 w-5 text-green-400" />,
      href: '/dashboard/presensi',
      items: [
        { 
          name: 'Absen', 
          icon: <LogIn className="h-4 w-4 text-green-400" />,
          href: '/dashboard/presensi/absen' 
        },
        { 
          name: 'History', 
          icon: <History className="h-4 w-4 text-green-400" />,
          href: '/dashboard/presensi/history' 
        }
      ]
    },
    {
      name: 'Riwayat Absensi',
      icon: <History className="h-5 w-5 text-purple-400" />,
      href: '/dashboard/riwayat-absensi',
      items: []
    },
    {
      name: 'Surat Keluar',
      icon: <Mail className="h-5 w-5 text-red-400" />,
      href: '/dashboard/surat-keluar',
      items: []
    },
    {
      name: 'Rekap Absensi',
      icon: <FileText className="h-5 w-5 text-orange-400" />,
      href: '/dashboard/rekap-absensi',
      items: []
    },
    {
      name: 'Pegawai',
      icon: <Users className="h-5 w-5 text-yellow-400" />,
      href: '/dashboard/pegawai',
      items: [
        { 
          name: 'Data', 
          icon: <Users className="h-4 w-4 text-yellow-400" />,
          href: '/dashboard/pegawai/data' 
        },
        { 
          name: 'Jabatan', 
          icon: <Briefcase className="h-4 w-4 text-yellow-400" />,
          href: '/dashboard/pegawai/jabatan' 
        }
      ]
    },
    {
      name: 'Inventory',
      icon: <Box className="h-5 w-5 text-teal-400" />,
      href: '/dashboard/inventory',
      items: [
        { 
          name: 'Alat Kalibrasi', 
          icon: <Wrench className="h-4 w-4 text-teal-400" />,
          href: '/dashboard/inventory/kalibrasi' 
        },
        { 
          name: 'Sparepart', 
          icon: <Package className="h-4 w-4 text-teal-400" />,
          href: '/dashboard/inventory/sparepart' 
        }
      ]
    },
    {
      name: 'Pengaturan',
      icon: <Settings className="h-5 w-5 text-gray-400" />,
      href: '/dashboard/pengaturan',
      items: []
    },
  ], [])

const activeMenu = useMemo(() => {
    if (!pathname) return 'Dashboard'
    const currentPath = pathname.split('/dashboard/')[1]?.split('/')[0] || ''
    const foundItem = menuItems.find(item => 
      item.href.includes(currentPath) || 
      item.items.some(subItem => subItem.href.includes(currentPath)))
    return foundItem?.name || 'Dashboard'
  }, [pathname, menuItems])

 if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0d0d0d]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-gray-200">
      {/* Sidebar menu  -ds*/}
       {!isMobile ? (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="w-64 bg-[#0d0d0d] border-r border-[#333] flex flex-col"
        >
        <div className="p-4 border-b border-[#333]">
          <h2 className="text-lg font-bold text-white">{user.role} Dashboard</h2>
          <div className="mt-2">
            <p className="text-sm text-blue-400">@{user.username}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.items.length > 0 ? (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between hover:bg-[#1a1a1a] hover:text-white px-3 py-2 ${
                        activeMenu === item.name ? 'bg-[#1a1a1a] text-white' : 'text-gray-400'
                      }`}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </div>
                      <ChevronDownIcon className="h-4 w-4 text-current" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-6 space-y-1">
                    {item.items.map((subItem) => (
                      <motion.div
                        key={subItem.name}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Link href={subItem.href}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start hover:bg-[#1a1a1a] hover:text-white px-3 py-1 ${
                              pathname === subItem.href ? 'bg-[#1a1a1a] text-white' : 'text-gray-400'
                            }`}
                          >
                            {subItem.icon}
                            <span className="ml-2">{subItem.name}</span>
                          </Button>
                        </Link>
                      </motion.div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start hover:bg-[#1a1a1a] hover:text-white px-3 py-2 ${
                        activeMenu === item.name ? 'bg-[#1a1a1a] text-white' : 'text-gray-400'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[#333]">
          <Button 
            variant="ghost"
            className="w-full justify-start hover:bg-[#1a1a1a] hover:text-white text-gray-400 px-3 py-2"
            onClick={() => {
              localStorage.removeItem('authToken')
              logout()
              window.location.href = '/login'
            }}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </Button>
        </div>
       </motion.aside> 
       
      ): isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-80"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.aside
            className="w-full max-w-xs bg-[#0d0d0d] border-r border-[#333] h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className="p-4 border-b border-[#333]">
              <h2 className="text-lg font-bold text-white">{user.role} Dashboard</h2>
              <div className="mt-2">
                <p className="text-sm text-blue-400">@{user.username}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.items.length > 0 ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`w-full justify-between hover:bg-[#1a1a1a] hover:text-white px-3 py-2 ${
                            activeMenu === item.name ? 'bg-[#1a1a1a] text-white' : 'text-gray-400'
                          }`}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.name}</span>
                          </div>
                          <ChevronDownIcon className="h-4 w-4 text-current" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-6 space-y-1">
                        {item.items.map((subItem) => (
                          <motion.div
                            key={subItem.name}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Link href={subItem.href} onClick={() => setIsMobileMenuOpen(false)}>
                              <Button
                                variant="ghost"
                                className={`w-full justify-start hover:bg-[#1a1a1a] hover:text-white px-3 py-1 ${
                                  pathname === subItem.href ? 'bg-[#1a1a1a] text-white' : 'text-gray-400'
                                }`}
                              >
                                {subItem.icon}
                                <span className="ml-2">{subItem.name}</span>
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start hover:bg-[#1a1a1a] hover:text-white px-3 py-2 ${
                            activeMenu === item.name ? 'bg-[#1a1a1a] text-white' : 'text-gray-400'
                          }`}
                        >
                          {item.icon}
                          <span className="ml-2">{item.name}</span>
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-[#333]">
              <Button 
                variant="ghost"
                className="w-full justify-start hover:bg-[#1a1a1a] hover:text-white text-gray-400 px-3 py-2"
                onClick={() => {
                  localStorage.removeItem('authToken')
                  logout()
                  window.location.href = '/login'
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          </motion.aside>
        </motion.div>
      )}

      {/* Main Content */}
       <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#1a1a1a] p-4 border-b border-[#333] flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mr-4 p-1 rounded-md hover:bg-[#333]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <h1 className="text-xl font-semibold text-white">{activeMenu}</h1>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-6 bg-[#0d0d0d]">
          <SmoothTransition>
            {children}
          </SmoothTransition>
        </div>
      </main>
    </div>
  )
}