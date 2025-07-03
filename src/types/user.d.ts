declare module '@/types/user' {
  export type UserRole = 'admin' | 'Owner' | 'Direktur' | 'karyawan';

  export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: UserRole;
    position?: string;
    department?: string;
    image?: string;
  }
}