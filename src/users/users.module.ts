import { AuthModule } from './../auth/auth.module';
import { Role } from './../role/role.entity';
import { RoleModule } from './../role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Role]), RoleModule, AuthModule],
  exports: [UsersService],
})
export class UsersModule {}
