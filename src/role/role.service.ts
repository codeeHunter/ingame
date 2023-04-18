import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.save(dto);

    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });

    return role;
  }
}
