import { authorDto } from './author.interface';
import { catalogueInterface } from './commons.interface';

export interface bookCreationDto {
  title: string;
  dateCreation: Date;
  authorIds: number[];
  categoriesId: number[];
  numPages: number;
  languageId: number;
}

export interface bookDto {
  id: number;
  title: string;
  description: string;
  dateCreation: Date;
  numPages: number;
  language: catalogueInterface;
  comments: any[];
  authors: authorDto[];
  categories: catalogueInterface[];
}
