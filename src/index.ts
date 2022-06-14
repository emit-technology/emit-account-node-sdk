import { networkAdapter } from './network';
import {INetwork, IConfig, IWidget, IDapp, SignWrapped} from './types';
import {AccountModel} from '@emit-technology/emit-lib';
import { onWindowLoad,validateSecureOrigin} from './utils';
import { windowLoadHandler,WidgetManager } from './widget';
import {Web3Manager} from './provider';
import {DataNode} from "./rpc/dataNode";
import {ChainType} from "@emit-technology/emit-lib";

const VERSION = '$$EMIT_BOX_VERSION$$';

onWindowLoad()
    .then(windowLoadHandler)
    .catch(() => {}); // Prevents unhandledPromiseRejectionWarning, which happens when using React SSR;

class EmitBox {
    private _widgetManagerInstance?: WidgetManager;
    private _web3ManagerInstance?: Web3Manager;
    private _config?: IConfig;
    public emitDataNode?: DataNode;

    constructor(dapp: IDapp, network: string | INetwork) {
        validateSecureOrigin();
        this._validateParams(network);
        this._config = {
            network: networkAdapter(network),
            version: VERSION,
            dapp: dapp
        };

        this._getWidgetCommunication = this._getWidgetCommunication.bind(this);
        this._widgetManagerInstance = new WidgetManager(this.config);

        this.changeNetwork = this.changeNetwork.bind(this);
        this.getWidget = this.getWidget.bind(this);
        this.onActiveWalletChanged = this.onActiveWalletChanged.bind(this);
        this.onError = this.onError.bind(this);
        this.showWidget = this.showWidget.bind(this);
        this.setSelectedAddress = this.setSelectedAddress.bind(this);
        this.newProvider = this.newProvider.bind(this);

        this.emitDataNode = new DataNode(this.config.network.nodeUrl,this._getWidgetCommunication,this._config);
    }

    get _widgetManager() {
        return this._widgetManagerInstance!;
    }

    get _web3Manager() {
        if(!this._web3ManagerInstance){
            this._web3ManagerInstance = new Web3Manager(this.config, this._getWidgetCommunication);
        }
        return this._web3ManagerInstance!;
    }

    get config() {
        return this._config!;
    }

    private async _getWidgetCommunication() {
        return (await this._widgetManager.getWidget()).communication;
    }

    get web3Provider() {
        return this._web3Manager.provider;
    }

    // Todo: deprecate
    get provider() {
        return this.web3Provider;
    }

    newProvider(config:IConfig){
        return new Web3Manager(config, this._getWidgetCommunication).provider;
    }

    changeNetwork(network: string | INetwork) {
        this._web3Manager.changeNetwork(network);
    }

    setSelectedAddress(address: string) {
        this._web3Manager.setSelectedAddress(address);
    }

    // async singleton
    async getWidget(): Promise<IWidget> {
        return this._widgetManager.getWidget();
    }

    // Population by the dev of SDK callbacks that might be invoked by the widget
    onActiveWalletChanged(callback: (walletAddress: string) => void) {
        this._widgetManager.setOnActiveWalletChangedCallback(callback);
    }

    onActiveAccountChanged(callback: (account: AccountModel) => void) {
        this._widgetManager.setOnActiveAccountChangedCallback(callback);
    }

    onError(callback: (error: Error) => void) {
        this._widgetManager.setOnErrorCallback(callback);
    }

    // SDK methods that could be invoked by the user and handled by the widget
    async showWidget() {
        return this._widgetManager.showWidget();
    }

    async batchSignMsg(signArr:Array<SignWrapped>){
        return this._widgetManager.batchSignMsg(signArr);
    }

    async requestAccount(){
        return this._widgetManager.requestAccount();
    }

    async calcGasPrice(gasLimitHex:string,chain:ChainType){
        return this._widgetManager.calcGasPrice(gasLimitHex,chain);
    }

    // internal methods
    private _validateParams(network: string | INetwork) {

        if (!network) {
            throw new Error(
                "[EMIT] 'network' is required.",
            );
        }
    }
}
export * from './types';

export default EmitBox;
