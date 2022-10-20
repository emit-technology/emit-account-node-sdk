// Generated by dts-bundle-generator v5.8.0

import { AsyncMethodReturns } from 'penpal';

export interface AccountModel {
	accountId?: string;
	name?: string;
	passwordHint?: string;
	avatar?: string;
	addresses?: {
		[chainType: number]: string;
	};
	key?: string;
	wallets?: {
		[chainType: number]: any;
	};
	backedUp?: boolean;
	timestamp?: number;
	password?: string;
}
declare enum ChainType {
	_ = 0,
	SERO = 1,
	ETH = 2,
	TRON = 3,
	BSC = 4,
	EMIT = 5
}
export interface FactorSet {
	settles: Array<Settle>;
	outs: Array<Out>;
}
export interface Factor {
	category: Category;
	value: string;
}
export interface Category {
	supplier: string;
	symbol: string;
	id: string;
}
export interface Out {
	target: string;
	factor: Factor;
	data: string;
}
export interface DataSet {
	name: string;
	data: string;
	old?: string;
}
export interface PrepareBlock {
	address: string;
	blk: Block;
}
export interface BlockRef {
	num: number;
	hash: string;
}
export interface Block {
	num: number;
	timestamp: number;
	parent_hash: string;
	data_sets: Array<DataSet>;
	factor_set: FactorSet;
	data?: string;
}
export interface Settle {
	from: string;
	num: number;
	index: number;
	factor: Factor;
}
export interface OutFactor {
	factor: Factor;
	timestamp: number;
}
export interface BlockWrapped {
	hash: string;
	block: Block;
}
export interface ConfirmedAccount {
	addr: string;
	blk_ref: BlockRef;
}
export interface SettleResp {
	factor: OutFactor;
	from_index_key: FromIndexKey;
	settled: boolean;
}
export interface FromIndexKey {
	from: string;
	num: number;
	index: number;
}
export interface INetwork {
	nodeUrl: string;
	chainId?: string;
	chainType: ChainType;
	backupAccountUrl?: string;
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
	batchSignMessage: (config: IConfig, signArr: Array<SignWrapped>) => Promise<{
		error: string;
		result: Array<SignWrapped>;
	}>;
	requestAccount: (config: IConfig, accountId?: string) => Promise<{
		error: string;
		result: AccountModel;
	}>;
	calcGasPrice: (gasLimitHex: string, chain: ChainType, config: IConfig) => Promise<{
		error: string;
		result: string;
	}>;
	setLanguage: (lang: string) => Promise<void>;
	checkAccess: () => Promise<boolean>;
}
export interface SignWrapped {
	address: string;
	chain: ChainType;
	msg: any;
	result?: any;
}
export interface IPayload {
	id: number;
	jsonrpc: string;
	method: string;
	params: any[];
}
export interface IReply {
	id: number;
	jsonrpc: string;
	method: string;
	result?: any;
	error?: any;
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
declare class WidgetManager {
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
	requestAccount(accountId?: string): Promise<{
		error: string;
		result: AccountModel;
	}>;
	setLanguage(code: string): Promise<void>;
	checkAccess(): Promise<boolean>;
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
}
declare class Rpc {
	id: number;
	host: string;
	constructor(host: string);
	post: (method: string, params: Array<any>) => Promise<any>;
}
declare class DataNode extends Rpc {
	private getWidgetCommunication;
	private config;
	constructor(host: string, getWidgetCommunication: () => Promise<AsyncMethodReturns<IMethods>>, config: IConfig);
	getConfirmedAccount: (address: string) => Promise<ConfirmedAccount>;
	getConfirmedBlock: (address: string) => Promise<BlockWrapped>;
	getData: (address: string, key: string) => Promise<any>;
	getBlock: (address: string, num: any) => Promise<any>;
	toHex(str: string, len?: number): string;
	getLatestBlocks: (address: string, pageSize?: number) => Promise<Array<BlockWrapped>>;
	getUnSettles: (address: string) => Promise<Array<SettleResp>>;
	compareSettles: (a: SettleResp, b: SettleResp) => 1 | 0 | -1;
	getFactors: (address: string) => Promise<Array<Factor>>;
	checkAccount: (address: string) => Promise<any>;
	genPrepareBlock: (address: string, data_sets: Array<DataSet>, factor_set: FactorSet, data?: string | undefined) => Promise<PrepareBlock>;
	prepareBlock: (prepareBlock: PrepareBlock) => Promise<boolean>;
}
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
	requestAccount(accountId?: string): Promise<{
		error: string;
		result: AccountModel;
	}>;
	setLanguage(code: string): Promise<void>;
	checkAccess(): Promise<boolean>;
	calcGasPrice(gasLimitHex: string, chain: ChainType): Promise<{
		error: string;
		result: string;
	}>;
	private _validateParams;
}
export default EmitBox;

export as namespace emit;

export {};
