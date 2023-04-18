import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseGuards } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RolesGuards } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/genre')
  @UseGuards(RolesGuards)
  @Roles('user')
  async getGenres() {
    return this.bookService.findAllGenres();
  }

  @Get()
  @UseGuards(RolesGuards)
  @Roles('user')
  async getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  @UseGuards(RolesGuards)
  @Roles('user')
  async getById(@Param('id') id: number) {
    return this.bookService.getById(id);
  }

  @Put(':id')
  @UseGuards(RolesGuards, JwtAuthGuard)
  @Roles('admin')
  async update(@Param('id') id: number, @Body() book: CreateBookDto) {
    return this.bookService.update(id, book);
  }

  @Delete(':id')
  @UseGuards(RolesGuards, JwtAuthGuard)
  @Roles('admin')
  async delete(@Param('id') id: number) {
    return this.bookService.delete(id);
  }

  @Post()
  @UseGuards(RolesGuards, JwtAuthGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './dist/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(@Body() book: CreateBookDto, @UploadedFile() file) {
    return this.bookService.create(book, file);
  }
}
