import { Roles } from 'src/auth/roles-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { RolesGuards } from 'src/auth/roles.guard';
import { AuthorService } from './author.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Author } from './author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @UseGuards(RolesGuards, JwtAuthGuard)
  @Roles('user')
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuards, JwtAuthGuard)
  @Roles('user')
  findOne(@Param('id') id: number): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuards, JwtAuthGuard)
  @Roles('admin')
  create(@Body() author: Author): Promise<Author> {
    return this.authorService.create(author);
  }

  @Put(':id')
  @UseGuards(RolesGuards, JwtAuthGuard)
  @Roles('admin')
  async update(@Param('id') id: number, @Body() author: Author) {
    return await this.authorService.update(id, author);
  }

  @Delete(':id')
  @UseGuards(RolesGuards, JwtAuthGuard)
  @Roles('admin')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.authorService.delete(id);
  }
}
