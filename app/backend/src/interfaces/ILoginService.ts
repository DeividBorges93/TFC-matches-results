import ILogin from './ILogin';

export default interface ILoginService<T> {
  login(data: ILogin): Promise<T>
}
