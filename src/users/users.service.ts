import { AddRoleDto } from './dto/add-role.dto';
import { User } from './users.entity';
import { RoleService } from './../role/role.service';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('user');

    if (!role) {
      throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.save(user);
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(user)
      .add(role);

    await this.userRepository.save(user);
    const savedUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['roles'],
    });
    return savedUser;
  }

  async getAllUsers() {
    const users = await this.userRepository.find({ relations: ['roles'] });

    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: { id: +dto.userId },
      relations: ['roles'],
    });

    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'roles')
        .of(user)
        .add(role);
      return dto;
    }

    throw new HttpException(
      'Пользователь или роль не найден',
      HttpStatus.NOT_FOUND,
    );
  }
}
