import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pen, Trash2, Eye } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface TableAlatKalibrasi {
  id: string
  nama_alat: string
  merek_model: string
  nomor_seri: string
  status: 'Aktif' | 'Tidak Aktif' | 'Dalam Kalibrasi' | 'Rusak'
  foto?: string
}

interface TableAlatKalibrasiProps {
  data?: TableAlatKalibrasi[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onView?: (id: string) => void
  isLoading?: boolean
}

const DEFAULT_DATA: TableAlatKalibrasi[] = [
      {
        id: 'AK-001',
        nama_alat: 'Multimeter Digital',
        merek_model: 'Fluke 87V',
        nomor_seri: 'FLK-2023-001',
        status: 'Aktif'
      },
      {
        id: 'AK-002',
        nama_alat: 'Termometer Infrared',
        merek_model: 'Testo 845',
        nomor_seri: 'TST-2023-002',
        status: 'Dalam Kalibrasi'
      },
        {
      id: 'STD-003',
      nama_alat: 'Multimeter Digital',
      merek_model: 'Fluke',
      nomor_seri: 'FLK-2024-003',
      status: 'Aktif'
    },
        {
      id: 'STD-004',
      nama_alat: 'Multimeter Digital',
      merek_model: 'Fluke',
      nomor_seri: 'FLK-2023-004',
      status: 'Aktif'
    },
        {
      id: 'STD-005',
      nama_alat: 'Multimeter Digital',
      merek_model: 'Fluke',
      nomor_seri: 'FLK-2024-005',
      status: 'Aktif'
    },

  ]

export function TableAlatKalibrasi({
  data = DEFAULT_DATA,
  onEdit,
  onDelete,
  onView,
  isLoading = false
}: TableAlatKalibrasiProps) {
  return (
    <div className="rounded-md border border-[#2e2e2e] overflow-hidden">
      <Table>
        <TableHeader className="bg-[#1e1e1e]">
          <TableRow>
            <TableHead className="text-blue-300">ID Alat</TableHead>
            <TableHead className="text-blue-300">Nama Alat</TableHead>
            <TableHead className="text-blue-300">Merk/Model</TableHead>
            <TableHead className="text-blue-300">Nomor Seri</TableHead>
            <TableHead className="text-blue-300">Status</TableHead>
            <TableHead className="text-blue-300 text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-[#2e2e2e] bg-[#1e1e1e]">
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full bg-[#333]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow className="border-[#2e2e2e] bg-[#1e1e1e]">
              <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                Tidak ada data alat kalibrasi
              </TableCell>
            </TableRow>
          ) : (
            data.map((alat) => (
              <TableRow 
                key={alat.id} 
                className="border-[#2e2e2e] hover:bg-[#1f1f1f]"
              >
                <TableCell className="text-white">{alat.id}</TableCell>
                <TableCell className="text-white">{alat.nama_alat}</TableCell>
                <TableCell className="text-white">{alat.merek_model}</TableCell>
                <TableCell className="text-white">{alat.nomor_seri}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      alat.status === 'Aktif' ? 'border-green-500 text-emerald-400' :
                      alat.status === 'Tidak Aktif' ? 'border-red-500 text-red-400' :
                      alat.status === 'Dalam Kalibrasi' ? 'border-yellow-500 text-amber-400' :
                      'border-gray-500 text-gray-400'
                    }
                  >
                    {alat.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {onView && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(alat.id)}
                      className="text-blue-300 hover:text-blue-300 hover:bg-[#252525]"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Lihat
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(alat.id)}
                      className="text-yellow-300 hover:text-yellow-300 hover:bg-[#252525]"
                    >
                      <Pen className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(alat.id)}
                      className="text-red-300 hover:text-red-300 hover:bg-[#252525]"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
