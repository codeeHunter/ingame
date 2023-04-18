import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
