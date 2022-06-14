import { INetwork, IConfig, IWidget, IDapp, SignWrapped } from './types';
import { AccountModel } from '@emit-technology/emit-lib';
import { WidgetManager } from './widget';
import { Web3Manager } from './provider';
import { DataNode } from "./rpc/dataNode";
import { ChainType } from "@emit-technology/emit-lib";
declare class EmitBox {
    private _widgetManagerInstance?;
    private _web3ManagerInstance?;
    private _config?;
    emitDataNode?: DataNode;
    constructor(dapp: IDapp, network: string | INetwork);
    get _widgetManager(): WidgetManager;
    get _web3Manager(): Web3Manager;
    get config(): IConfig;
    private _getWidgetCommunication;
    get web3Provider(): any;
    get provider(): any;
    newProvider(config: IConfig): any;
    changeNetwork(network: string | INetwork): void;
    setSelectedAddress(address: string): void;
    getWidget(): Promise<IWidget>;
    onActiveWalletChanged(callback: (walletAddress: string) => void): void;
    onActiveAccountChanged(callback: (account: AccountModel) => void): void;
    onError(callback: (error: Error) => void): void;
    showWidget(): Promise<void>;
    batchSignMsg(signArr: Array<SignWrapped>): Promise<SignWrapped[]>;
    requestAccount(): Promise<{
        error: string;
        result: AccountModel;
    }>;
    calcGasPrice(gasLimitHex: string, chain: ChainType): Promise<{
        error: string;
        result: string;
    }>;
    private _validateParams;
}
export * from './types';
export default EmitBox;
