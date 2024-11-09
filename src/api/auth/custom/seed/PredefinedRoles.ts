import { RolesEntity } from '../entities';

const PredefinedRoles: Partial<RolesEntity>[] = [
  {
    roleId: '1',
    roleName: 'super',
    roleDescription: 'Custom Auth Super Admin',
    roleStatus: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    verified: true,
  },
  {
    roleId: '2',
    roleName: 'admin',
    roleDescription: 'Custom Auth Admin',
    roleStatus: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    verified: true,
  },
];
export default PredefinedRoles;
