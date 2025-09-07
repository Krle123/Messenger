export class User {
  public constructor(
    public id: number = 0,
    public username: string = '',
    public role: string = 'user',
    public password: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public phone: string = ''
  ) {}
}