import { Genre } from './../genre.entity';
import { Author } from './../../author/author.entity';

export class CreateBookDto {
  readonly name: string;
  readonly publicationDate: string;
  readonly edition: string;
  readonly file: string;
  readonly authors: Author[];
  readonly genre: Genre[];
}
