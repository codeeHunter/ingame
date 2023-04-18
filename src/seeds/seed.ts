/* eslint-disable prettier/prettier */
import { Book } from '../book/book.entity';
import { Author } from './../author/author.entity';
import { User } from './../users/users.entity';
import { Role } from './../role/role.entity';
import { Genre } from '../book/genre.entity';
import { getRepository } from 'typeorm';
import { createConnection } from 'typeorm';
import { getConnection } from 'typeorm';

export async function seed() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'ingame',
    entities: [Genre, Book, Author, User, Role],
    synchronize: true,
  });

  const connectionGet = getConnection();

  const genreRepository = connectionGet.getRepository(Genre);
  const userRepository = connectionGet.getRepository(User);
  const roleRepository = connectionGet.getRepository(Role);

  // Seed genres
  const genres = [
    { name: 'Фантастика' },
    { name: 'Роман' },
    { name: 'Поэзия' },
  ];

  // Seed genres
  const role = [
    { value: 'Admin', description: 'Администратор' },
    { value: 'user', description: 'Пользователь' },
  ];

  const user = [
    {
      name: 'User',
      email: 'user@email.com',
      password: 'user',
      roles: [{ id: 2 }],
    },
    {
      name: 'Admin',
      email: 'admin@email.com',
      password: 'admin',
      roles: [{ id: 1 }],
    },
  ];

  await roleRepository.save(role);
  await userRepository.save(user);
  await genreRepository.save(genres);
}

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seed complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
