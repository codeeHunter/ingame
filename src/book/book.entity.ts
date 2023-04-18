/* eslint-disable prettier/prettier */
import { Genre } from './genre.entity';
import { Author } from './../author/author.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'int' })
  year: number;

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genre: Genre[];

  @Column({ type: 'varchar' })
  file: string;

  @Column({ type: 'varchar' })
  edition: string;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable()
  authors: Author[];
}
