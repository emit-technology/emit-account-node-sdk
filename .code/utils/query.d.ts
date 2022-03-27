export interface IQuery {
    getBlockByNumber: (blockNumber: string, fullTransaction: boolean) => any;
    getCode: (address: string) => any;
    estimateGas: (txParams: any) => any;
}
export declare class EthQuery implements IQuery {
    private provider;
    constructor(provider: any);
    getBlockByNumber(blockNumber: string, fullTransaction: boolean): Promise<any>;
    getCode(address: string): any;
    estimateGas(txParams: any): any;
    private sendAsync;
}
export declare class SeroQuery implements IQuery {
    private provider;
    constructor(provider: any);
    getBlockByNumber(blockNumber: string, fullTransaction: boolean): Promise<any>;
    getCode(address: string): any;
    estimateGas(txParams: any): any;
    private sendAsync;
}
