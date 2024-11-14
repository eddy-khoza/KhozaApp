export class UserDTO {

  constructor(data:Partial<UserDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  username?: string|null;
  password?: string|null;
  firstName?: string|null;
  surname?: string|null;
  email?: string|null;

}
