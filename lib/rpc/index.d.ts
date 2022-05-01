declare class Rpc {
    id: number;
    host: string;
    constructor(host: string);
    post: (method: string, params: Array<any>) => Promise<any>;
}
export default Rpc;
