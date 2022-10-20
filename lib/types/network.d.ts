import { ChainType } from '@emit-technology/emit-lib';
export interface INetwork {
    nodeUrl: string;
    chainId?: string;
    chainType: ChainType;
    backupAccountUrl?: string;
}
