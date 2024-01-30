export interface catalogueInterface {
  id?: number;
  name: string;
}
export interface pagDto<T> {
  items: T[];
  total: number;
  index: number;
}
