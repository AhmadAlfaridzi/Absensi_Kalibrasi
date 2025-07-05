'use client'
import { DateRange } from 'react-day-picker'

import {  X } from 'lucide-react'
import { StatusFilter } from '@/types/alat'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AlatKalibrasiFiltersProps {
  dateRange: DateRange | undefined
  onDateChange: (range: DateRange | undefined) => void
  filters: {
    nama_alat: string
    merek_model: string
    nomor_seri: string
    lokasi: string
    status: StatusFilter
  }
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onStatusChange: (value: StatusFilter) => void
  onReset: () => void
  onExport?: () => void
}

export function AlatKalibrasiFilters({
  filters,
  onFilterChange,
  onStatusChange,
  onReset,
  onExport
}: AlatKalibrasiFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Header dan Reset Button */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h1 className="text-2xl font-bold text-gray-100">
          Daftar Alat Kalibrasi
        </h1>
        
        <div className="flex gap-2">
          {onExport && (
            <Button
              onClick={onExport}
              variant="outline"
              className="bg-blue-800/20 text-blue-300 hover:bg-blue-800/50 hover:text-blue-100"
            >
              Ekspor Data
            </Button>
          )}
          <Button 
            onClick={onReset} 
            variant="outline"
            className="border-red-800/30 bg-red-800/20 text-red-300 hover:bg-red-800/50 hover:text-red-100"
          >
            <X className="h-4 w-4 mr-2" />
            Reset Filter
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Date Picker
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Rentang Tanggal Kalibrasi</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal bg-[#1e1e1e] border-[#2e2e2e] hover:bg-[#2e2e2e] hover:text-gray-100"
              >
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
            <PopoverContent className="w-auto p-0 bg-[#1e1e1e] border-[#2e2e2e]" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={onDateChange}
                numberOfMonths={2}
                className="bg-[#1e1e1e] text-gray-100"
              />
            </PopoverContent>
          </Popover>
        </div> */}

        {/* Nama Alat Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Nama Alat</label>
          <Input
            name="nama_alat"
            placeholder="Cari nama alat..."
            value={filters.nama_alat}
            onChange={onFilterChange}
            className="bg-[#1e1e1e] border-[#2e2e2e] focus:border-blue-500 text-gray-100"
          />
        </div>

        {/* Merk/Model Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Merk/Model</label>
          <Input
            name="merek_model"
            placeholder="Filter merk/model..."
            value={filters.merek_model}
            onChange={onFilterChange}
            className="bg-[#1e1e1e] border-[#2e2e2e] focus:border-blue-500 text-gray-100"
          />
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Status</label>
          <Select
            value={filters.status}
            onValueChange={onStatusChange}
          >
            <SelectTrigger className="w-full bg-[#1e1e1e] border-[#2e2e2e] text-gray-100">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e1e1e] border-[#2e2e2e]">
              <SelectItem value="all" className="hover:bg-[#252525]">Semua Status</SelectItem>
              <SelectItem value="Aktif" className="hover:bg-[#252525]">
                <span className="text-emerald-400">Aktif</span>
              </SelectItem>
              <SelectItem value="Tidak Aktif" className="hover:bg-[#252525]">
                <span className="text-amber-400">Tidak Aktif</span>
              </SelectItem>
              <SelectItem value="Dalam Kalibrasi" className="hover:bg-[#252525]">
                <span className="text-blue-300">Dalam Kalibrasi</span>
              </SelectItem>
              <SelectItem value="Rusak" className="hover:bg-[#252525]">
                <span className="text-red-400">Rusak</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

