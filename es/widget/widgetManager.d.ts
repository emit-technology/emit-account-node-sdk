import { IConfig, IWidget, SignWrapped } from '../types';
import { AccountModel } from '@emit-technology/emit-lib';
import { ChainType } from "@emit-technology/emit-lib";
export declare function windowLoadHandler(): void;
export declare class WidgetManager {
    private _widgetConfig;
    private widgetPromise?;
    private widgetInstance?;
    private _widgetUrl;
    private _onActiveWalletChangedCallback?;
    private _onActiveAccountChangedCallback?;
    private _onErrorCallback;
    constructor(_widgetConfig: IConfig);
    getWidget(): Promise<IWidget>;
    setOnActiveWalletChangedCallback(callback: (walletAddress: string) => void): void;
    setOnActiveAccountChangedCallback(callback: (account: AccountModel) => void): void;
    setOnErrorCallback(callback: (error: Error) => void): void;
    showWidget(): Promise<void>;
    requestAccount(): Promise<{
        error: string;
        result: AccountModel;
    }>;
    calcGasPrice(gasLimitHex: string, chain: ChainType): Promise<{
        error: string;
        result: string;
    }>;
    batchSignMsg(signArr: Array<SignWrapped>): Promise<Array<SignWrapped>>;
    private static _checkIfWidgetAlreadyInitialized;
    private _initWidget;
    private _setHeight;
    private static _getWindowSize;
    private _onActiveWalletChanged;
    private _onActiveAccountChanged;
    private hasOnActiveWalletChanged;
    private _onError;
}
