import { AdminEntity } from './../entities';

interface AdminRepository {
  findAdminByAdminId(adminId: string): Promise<AdminEntity | null>;

  findAdminByEmail(email: string): Promise<AdminEntity | null>;

  createAdmin(adminData: Partial<any>): Promise<AdminEntity>;
}

export default AdminRepository;
