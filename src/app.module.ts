import { UsersModule } from './users/users.module';
import { join } from 'path';
import { Genre } from './book/genre.entity';
import { Book } from 'src/book/book.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { Author } from './author/author.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Book, Author, Genre],
      autoLoadEntities: true,
      synchronize: true,
    }),

    BookModule,
    AuthorModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
