export class User {
  public constructor(
    public id: number = 0,
    public username: string = '',
    public role: string = 'user',
    public password: string = '',
    public firstname: string = '',
    public surname: string = '',
    public phone: string = ''
  ) {}
}