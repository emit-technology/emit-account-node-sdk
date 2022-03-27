import { IConfig, IWidget } from '../types';
export declare function windowLoadHandler(): void;
export declare class WidgetManager {
    private _widgetConfig;
    private widgetPromise?;
    private widgetInstance?;
    private _widgetUrl;
    private _onActiveWalletChangedCallback?;
    private _onErrorCallback;
    constructor(_widgetConfig: IConfig);
    getWidget(): Promise<IWidget>;
    setOnActiveWalletChangedCallback(callback: (walletAddress: string) => void): void;
    setOnErrorCallback(callback: (error: Error) => void): void;
    showWidget(): Promise<void>;
    private static _checkIfWidgetAlreadyInitialized;
    private _initWidget;
    private _setHeight;
    private static _getWindowSize;
    private _onActiveWalletChanged;
    private hasOnActiveWalletChanged;
    private _onError;
}
