export interface UserDto {
  userName: string;
  email: string;
}
export interface UserCreateDto extends UserDto {
  password: string;
}
