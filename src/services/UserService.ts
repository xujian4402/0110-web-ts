import axios from 'axios';
import DaoRequest, { DaoRequestInstance } from '@/services/Request';

export default class UserService {
  private daoReq: DaoRequestInstance;

  constructor(private _cancelToken?: any) {
    this.daoReq = new DaoRequest(_cancelToken);
  }

  public queryUserInfo(username: string, password: string) {
    return this.daoReq.post!('b/user/login', { username, password });
  }
}
