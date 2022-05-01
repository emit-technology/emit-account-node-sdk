import axios from 'axios';
class Rpc {
  id: number;

  host: string;

  constructor(host: string) {
    this.host = host;
    this.id = 0;
  }

  post = async (method: string, params: Array<any>):Promise<any> => {
    const data = {
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: this.id++,
    };

    const resp = await axios.post(this.host, data);
    if (resp.data) {
      if (resp.data.error) {
        if (resp.data.error.code) {
          return Promise.reject(resp.data.error.message);
        }
        return Promise.reject(resp.data.error);
      } else {
        return Promise.resolve(resp.data.result);
      }
    }
  };
}

export default Rpc;
