'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">403</h1>
        <p className="text-xl">Akses Ditolak</p>
        <p className="text-gray-500">
          Anda tidak memiliki izin untuk mengakses halaman ini
        </p>
      </div>
      <Button onClick={() => router.push('/dashboard')}>
        Kembali ke Dashboard
      </Button>
    </div>
  )
}