export interface AccountModel {
    accountId?: string;
    name: string;
    avatar?: string;
    hint?: string;
    addresses?: {
        [chainType: number]: string;
    };
    createType?: CreateType;
}
export declare enum CreateType {
    Mnemonic = 0,
    PrivateKey = 1
}
export declare enum ChainType {
    _ = 0,
    SERO = 1,
    ETH = 2,
    TRON = 3,
    BSC = 4,
    EMIT = 5
}
