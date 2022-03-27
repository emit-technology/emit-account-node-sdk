export interface AccountModel {
    accountId?: string
    name: string
    password?: string
    avatar?: string
    hint?: string
    addresses?: Array<{[chainType:number]:string}>
    createType?: CreateType;
}
export enum CreateType {
    Mnemonic,
    PrivateKey,
}

export enum ChainType {
    _,
    SERO,
    ETH,
    TRON,
    BSC,
    EMIT
}