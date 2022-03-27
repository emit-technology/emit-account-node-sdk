import { ChainType } from "./";
export interface INetwork {
    nodeUrl: string;
    chainId?: string;
    chainType: ChainType;
}
