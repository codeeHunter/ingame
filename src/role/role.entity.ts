/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './../users/users.entity';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  value: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
  users: User[];
}
