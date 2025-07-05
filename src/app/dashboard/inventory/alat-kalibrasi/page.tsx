'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import { DateRange } from 'react-day-picker'
import { subDays } from 'date-fns'
// import { id } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { AlatKalibrasi, StatusFilter } from '@/types/alat'

import { TableAlatKalibrasi } from '@/components/inventaris/alat-kalibrasi-table'
import { AlatKalibrasiFilters } from '@/components/inventaris/alatKalibrasiFilter'
import { AlatKalibrasiPhotoModal } from '@/components/inventaris/alatKalibrasiPhoto'

const DUMMY_DATA: AlatKalibrasi[] = [
  {
    id: 'AK-001',
    nama_alat: 'Multimeter Digital',
    merek_model: 'Fluke 87V',
    nomor_seri: 'FLK-2023-001',
    rentang_pengukuran: '0-1000V DC, 0-10A DC',
    kelas_akurasi: '0.5%',
    tanggal_kalibrasi: '2023-06-15',
    tanggal_kadaluarsa: '2024-06-15',
    id_lokasi: 'LAB-01',
    status: 'Aktif',
    foto: '/images/multimeter.jpg'
  },
  {
    id: 'AK-002',
    nama_alat: 'Termometer Infrared',
    merek_model: 'Testo 845',
    nomor_seri: 'TST-2023-002',
    rentang_pengukuran: '-30°C hingga 400°C',
    kelas_akurasi: '±1.5°C',
    tanggal_kalibrasi: '2023-07-20',
    tanggal_kadaluarsa: '2024-07-20',
    id_lokasi: 'LAB-02',
    status: 'Dalam Kalibrasi'
  }
]


export default function RecordDataAlatKalibrasi() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [data, setData] = useState<AlatKalibrasi[]>([])
  const [filteredData, setFilteredData] = useState<AlatKalibrasi[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date()
  })

  const adaptToTableData = (data: AlatKalibrasi[]) => {
    return data.map(item => ({
      id: item.id,
      nama_alat: item.nama_alat,
      merek_model: item.merek_model,
      nomor_seri: item.nomor_seri,
      status: item.status,
      foto: item.foto
    }))
  }


  const tableData = adaptToTableData(filteredData)
   
  const [filters, setFilters] = useState({
    nama_alat: '',
    merek_model: '',
    nomor_seri: '',
    lokasi: '',
    status: 'all' as StatusFilter
  })

  const [showPhotoModal, setShowPhotoModal] = useState({
    open: false,
    photoUrl: '',
    title: ''
  })

  // Filter data
  useEffect(() => {
    if (!isAuthenticated) return

    setLoading(true)
    let result = [...data]

    if (filters.nama_alat) {
      result = result.filter(item => 
        item.nama_alat.toLowerCase().includes(filters.nama_alat.toLowerCase())
      )
    }

    if (filters.merek_model) {
      result = result.filter(item => 
        item.merek_model.toLowerCase().includes(filters.merek_model.toLowerCase())
      )
    }

    if (filters.status !== 'all') {
      result = result.filter(item => item.status === filters.status)
    }

    setFilteredData(result)
    setLoading(false)
  }, [data, filters, isAuthenticated])

  // Load initial data
  useEffect(() => {
    if (isAuthenticated) {
      setData(DUMMY_DATA)
      setFilteredData(DUMMY_DATA)
      setLoading(false)
    }
  }, [isAuthenticated])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: StatusFilter) => {
    setFilters(prev => ({ ...prev, status: value }))
  }

  const resetFilters = () => {
    setDateRange({
      from: subDays(new Date(), 30),
      to: new Date()
    })
    setFilters({
      nama_alat: '',
      merek_model: '',
      nomor_seri: '',
      lokasi: '',
      status: 'all'
    })
  }

  const handleView = (id: string) => {
    const alat = data.find(item => item.id === id)
    if (alat?.foto) {
      setShowPhotoModal({
        open: true,
        photoUrl: alat.foto,
        title: alat.nama_alat
      })
    }
  }

  const handleEdit = (id: string) => {
    console.log('Edit alat:', id)
    // Implementasi edit
  }

  const handleDelete = (id: string) => {
    console.log('Hapus alat:', id)
    // Implementasi delete
  }

  if (authLoading) {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
    </div>
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-gray-100">
      Silakan login untuk mengakses data alat kalibrasi
    </div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6 bg-[#1e1e1e] min-h-screen text-gray-100"
    >
      <AlatKalibrasiFilters 
        dateRange={dateRange}
        onDateChange={setDateRange}
        filters={filters}
        onFilterChange={handleFilterChange}
        onStatusChange={handleStatusChange}
        onReset={resetFilters}
      />

      <TableAlatKalibrasi 
        data={tableData}
        isLoading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AlatKalibrasiPhotoModal 
        open={showPhotoModal.open}
        photoUrl={showPhotoModal.photoUrl}
        title={showPhotoModal.title}
        onClose={() => setShowPhotoModal(prev => ({ ...prev, open: false }))}
      />
    </motion.div>
  )
}