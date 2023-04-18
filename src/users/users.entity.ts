/* eslint-disable prettier/prettier */
import { Role } from './../role/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

interface UserCreationAttrs {
  surname: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  email: string;

  @Column({
    type: 'text',
  })
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles: User[];
}
