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
  books: any[];
  country: catalogueInterface;
  biography: string;
  birthDate: Date;
}
