export interface IQuery {
    getBlockByNumber: (blockNumber: string, fullTransaction: boolean) => any;

    getCode : (address: string) => any;

    estimateGas : (txParams: any) => any;

}

export class EthQuery implements IQuery{

    constructor(private provider: any) {}

    getBlockByNumber(blockNumber: string, fullTransaction: boolean) {
        return this.sendAsync('eth_getBlockByNumber', blockNumber, fullTransaction);
    }

    getCode(address: string):any {
        return this.sendAsync('eth_getCode', address, 'latest');
    }

    estimateGas(txParams: any):any {
        return this.sendAsync('eth_estimateGas', txParams);
    }

    private sendAsync(methodName: string, ...args: any[]) {
        return new Promise<any>((resolve, reject) => {
            this.provider.sendAsync(
                {
                    id: 42,
                    jsonrpc: '2.0',
                    method: methodName,
                    params: args,
                },
                (error: any, response: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response.result);
                    }
                },
            );
        });
    }
}


export class SeroQuery implements IQuery{

    constructor(private provider: any) {}

    getBlockByNumber(blockNumber: string, fullTransaction: boolean) {
        return this.sendAsync('sero_getBlockByNumber', blockNumber, fullTransaction);
    }

    getCode(address: string):any {
        return this.sendAsync('sero_getCode', address, 'latest');
    }

    estimateGas(txParams: any):any {
        return this.sendAsync('sero_estimateGas', txParams);
    }

    private sendAsync(methodName: string, ...args: any[]) {
        return new Promise<any>((resolve, reject) => {
            this.provider.sendAsync(
                {
                    id: 32,
                    jsonrpc: '2.0',
                    method: methodName,
                    params: args,
                },
                (error: any, response: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response.result);
                    }
                },
            );
        });
    }
}
