export interface authUserInterface {
  email: string;
  token: string;
  expiration: Date;
  roles: string[];
}
