import { Genre } from './genre.entity';
import { Author } from './../author/author.entity';
import { Book } from 'src/book/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find({
      order: { id: 'ASC' },
      relations: ['authors', 'genre'],
    });
  }

  async createFile(file): Promise<string> {
    const fileName = uuid.v4() + '.txt';
    const filePath = path.resolve(__dirname, '..', 'uploads');

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }

    fs.writeFileSync(path.join(filePath, fileName), file.mimetype);
    return fileName;
  }

  async create(book: CreateBookDto, file) {
    return await this.bookRepository.save({
      ...book,
      file: file.filename,
    });
  }

  async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['authors', 'genre'],
    });

    if (!book) {
      throw new BadRequestException();
    }

    return book;
  }

  async getById(id: number): Promise<Book> {
    const book = await this.findById(id);

    return book;
  }

  async update(id: number, updateBookDto: CreateBookDto) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['authors', 'genre'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const { authors, genre, ...otherData } = updateBookDto;

    const queryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .update()
      .set(otherData);

    if (authors && authors.length > 0) {
      queryBuilder
        .relation('authors')
        .of(book)
        .addAndRemove(authors, book.authors);
    }

    if (genre && genre.length > 0) {
      queryBuilder.relation('genre').of(book).addAndRemove(genre, book.genre);
    }

    await queryBuilder.where('id = :id', { id }).execute();

    return await this.bookRepository.findOne({
      where: { id },
      relations: ['authors', 'genre'],
    });
  }

  async delete(id: number) {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return await this.bookRepository.delete(id);
  }

  async findAllGenres() {
    return await this.genreRepository.find();
  }
}
