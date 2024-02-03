import { bookDto } from './book.interface';
import { catalogueInterface } from './commons.interface';

export interface authorCreation {
  name: string;
  countryId: number;
  biography: string;
  birthDate: Date;
}

export interface authorDto {
  id: number;
  name: string;
  books: bookDto[];
  country: catalogueInterface;
  biography: string;
  birthDate: Date;
}
