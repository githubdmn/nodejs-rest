import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from '../entities';
import PredefinedRoles from './PredefinedRoles';

@Injectable()
export class RolesSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
  }

  private async seedRoles() {
    const roleCount = await this.roleRepository.count();
    const preparedAdminRole = this.roleRepository.create(PredefinedRoles);
    if (roleCount === 0) {
      await this.roleRepository.save(preparedAdminRole);
    }
    this.logger.log('Roles Seeded!');
  }
}
