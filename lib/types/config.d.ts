import { INetwork } from "./";
export interface IConfig {
    network: INetwork;
    dapp?: IDapp;
    version: string;
}
export interface IDapp {
    name?: string;
    url?: string;
    category?: string;
    contractAddress?: any;
}
