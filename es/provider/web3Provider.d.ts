import { INetwork, IMethods, IConfig } from '../types';
import { AsyncMethodReturns } from 'penpal';
declare const ProviderEngine: any;
export declare class Web3Manager {
    private config;
    private _getWidgetCommunication;
    private engine;
    provider: typeof ProviderEngine;
    private _selectedAddress?;
    private _network?;
    constructor(config: IConfig, _getWidgetCommunication: () => Promise<AsyncMethodReturns<IMethods>>);
    setSelectedAddress(selectedAddress: string): void;
    changeNetwork(network: string | INetwork): void;
    private _initProvider;
}
export {};
