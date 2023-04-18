/* eslint-disable prettier/prettier */
import { Book } from '../book/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  birthDate: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}
