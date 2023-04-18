/* eslint-disable prettier/prettier */
import { Book } from '../book/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Book, (book) => book.genre)
  books: Book[];
}
