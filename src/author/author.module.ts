import { Author } from './author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

@Module({
  providers: [AuthorService],
  controllers: [AuthorController],
  imports: [TypeOrmModule.forFeature([Author])],
})
export class AuthorModule {}
