import { INetwork, IConfig, IWidget, IDapp } from './types';
import { WidgetManager } from './widget';
import { Web3Manager } from './provider';
declare class EmitBox {
    private _widgetManagerInstance?;
    private _web3ManagerInstance?;
    private _config?;
    constructor(dapp: IDapp, network: string | INetwork);
    get _widgetManager(): WidgetManager;
    get _web3Manager(): Web3Manager;
    get config(): IConfig;
    private _getWidgetCommunication;
    get web3Provider(): any;
    get provider(): any;
    changeNetwork(network: string | INetwork): void;
    getWidget(): Promise<IWidget>;
    onActiveWalletChanged(callback: (walletAddress: string) => void): void;
    onError(callback: (error: Error) => void): void;
    showWidget(): Promise<void>;
    private _validateParams;
}
export default EmitBox;
