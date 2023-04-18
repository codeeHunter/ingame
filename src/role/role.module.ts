import { User } from './../users/users.entity';
import { Role } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([Role, User])],
  exports: [RoleService],
})
export class RoleModule {}
