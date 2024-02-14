export interface catalogueInterface {
  id?: number | string;
  name: string;
}
export interface pagDto<T> {
  items: T[];
  total: number;
  index: number;
  totalPages: number;
}
