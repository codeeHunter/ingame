import { AuthModule } from './../auth/auth.module';
import { forwardRef } from '@nestjs/common';
import { Genre } from './genre.entity';
import { Author } from './../author/author.entity';
import { Book } from 'src/book/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Genre]),
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
