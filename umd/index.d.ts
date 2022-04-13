// Generated by dts-bundle-generator v5.8.0

import { AsyncMethodReturns } from 'penpal';

export interface INetwork {
	nodeUrl: string;
	chainId?: string;
	chainType: ChainType;
}
export interface IMethods {
	getAccounts: (config: IConfig) => Promise<{
		error: string;
		result: Array<string>;
	}>;
	signTransaction: (txParams: any, config: IConfig) => Promise<{
		error: string;
		result: string;
	}>;
	signMessage: (msgParams: any, config: IConfig) => Promise<{
		error: string;
		result: string;
	}>;
	relay: (payload: IPayload, config: IConfig) => Promise<{
		error: string;
		result: any;
	}>;
	showWidget: (config: IConfig) => Promise<void>;
	setConfig: (config: IConfig) => Promise<void>;
}
export interface IPayload {
	id: number;
	jsonrpc: string;
	method: string;
	params: any[];
}
export interface IWidget {
	communication: AsyncMethodReturns<IMethods>;
	widgetFrame: HTMLDivElement;
}
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
declare enum ChainType {
	_ = 0,
	SERO = 1,
	ETH = 2,
	TRON = 3,
	BSC = 4,
	EMIT = 5
}
declare class WidgetManager {
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
declare const ProviderEngine: any;
declare class Web3Manager {
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
	private clearSubprovider;
}
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
	setSelectedAddress(address: string): void;
	getWidget(): Promise<IWidget>;
	onActiveWalletChanged(callback: (walletAddress: string) => void): void;
	onError(callback: (error: Error) => void): void;
	showWidget(): Promise<void>;
	private _validateParams;
}
export default EmitBox;

export as namespace emit;

export {};
