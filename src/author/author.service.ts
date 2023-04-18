import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll() {
    return this.authorRepository.find({
      relations: ['books'],
      order: { id: 'ASC' },
    });
  }

  findOne(id: number): Promise<Author> {
    return this.authorRepository.findOne({ where: { id } });
  }

  create(author: Author): Promise<Author> {
    return this.authorRepository.save(author);
  }

  async update(id: number, author: Author) {
    await this.authorRepository.update(id, author);
    return this.authorRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
