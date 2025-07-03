'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { DateRange } from 'react-day-picker'
import { format, subDays } from 'date-fns'
import { id } from 'date-fns/locale'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

// Ikon
import { Calendar as CalendarIcon, 
    // Filter, 
    Loader2, Search, X, Camera } from 'lucide-react'

interface AttendanceRecord {
  id: string
  date: string
  clockIn: string
  clockOut: string | null
  status: 'Tepat Waktu' | 'Terlambat' | 'Pulang Cepat'
  employee: {
    id: string
    name: string
    department: string
    position: string
  }
  photoIn: string | null
  photoOut: string | null
}

export default function RiwayatAbsenPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date()
  })
  const [filters, setFilters] = useState({
    name: '',
    department: '',
    status: ''
  })
  const [showPhotoModal, setShowPhotoModal] = useState({
    open: false,
    photoUrl: '',
    type: ''
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      
      let url = '/api/attendance/history?'
      
      if (dateRange?.from) {
        url += `startDate=${format(dateRange.from, 'yyyy-MM-dd')}&`
      }
      
      if (dateRange?.to) {
        url += `endDate=${format(dateRange.to, 'yyyy-MM-dd')}&`
      }
      
      if (filters.name) {
        url += `name=${filters.name}&`
      }
      
      if (filters.department) {
        url += `department=${filters.department}&`
      }
      
      if (filters.status) {
        url += `status=${filters.status}&`
      }

      const response = await fetch(url)
      const result = await response.json()
      setData(result.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session, dateRange, filters])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value
    })
  }

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range)
  }

  const resetFilters = () => {
    setDateRange({
      from: subDays(new Date(), 7),
      to: new Date()
    })
    setFilters({
      name: '',
      department: '',
      status: ''
    })
  }

  const openPhotoModal = (photoUrl: string, type: string) => {
    setShowPhotoModal({
      open: true,
      photoUrl,
      type
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header dan Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h1 className="text-2xl font-bold">Riwayat Absensi Karyawan</h1>
        
        <div className="flex items-center gap-2">
          <Button onClick={resetFilters} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Reset Filter
          </Button>
          <Button onClick={fetchData} disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4 mr-2" />}
            {loading ? 'Memuat...' : 'Cari'}
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Rentang Tanggal</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'dd MMM yyyy', { locale: id })} -{' '}
                      {format(dateRange.to, 'dd MMM yyyy', { locale: id })}
                    </>
                  ) : (
                    format(dateRange.from, 'dd MMM yyyy', { locale: id })
                  )
                ) : (
                  <span>Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                locale={id}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Name Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Nama Karyawan</label>
          <Input
            name="name"
            placeholder="Cari nama..."
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>

        {/* Department Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Departemen</label>
          <Input
            name="department"
            placeholder="Filter departemen..."
            value={filters.department}
            onChange={handleFilterChange}
          />
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({...filters, status: value})}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua Status</SelectItem>
              <SelectItem value="Tepat Waktu">Tepat Waktu</SelectItem>
              <SelectItem value="Terlambat">Terlambat</SelectItem>
              <SelectItem value="Pulang Cepat">Pulang Cepat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Departemen</TableHead>
              <TableHead>Masuk</TableHead>
              <TableHead>Pulang</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Foto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Tidak ada data yang ditemukan
                </TableCell>
              </TableRow>
            ) : (
              data.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {format(new Date(record.date), 'dd MMM yyyy', { locale: id })}
                  </TableCell>
                  <TableCell>{record.employee.name}</TableCell>
                  <TableCell>{record.employee.department}</TableCell>
                  <TableCell>{record.clockIn}</TableCell>
                  <TableCell>{record.clockOut || '-'}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        record.status === 'Tepat Waktu' ? 'default' :
                        record.status === 'Terlambat' ? 'secondary' : 'destructive'
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    {record.photoIn && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openPhotoModal(record.photoIn!, 'Masuk')}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Masuk
                      </Button>
                    )}
                    {record.photoOut && (
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => openPhotoModal(record.photoOut!, 'Pulang')}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Pulang
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Photo Modal */}
      {showPhotoModal.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Foto Absen {showPhotoModal.type}
              </h3>
              <Button
                variant="ghost"
                onClick={() => setShowPhotoModal({...showPhotoModal, open: false})}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={showPhotoModal.photoUrl}
                alt={`Foto ${showPhotoModal.type}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}