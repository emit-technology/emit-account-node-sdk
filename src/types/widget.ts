import {IConfig} from "./";
import {AccountModel,ChainType} from '@emit-technology/emit-lib';
import { AsyncMethodReturns } from 'penpal';

export interface IMethods {

    getAccounts: (config:IConfig) => Promise<{error:string;result:Array<string>}>;

    signTransaction: (txParams: any,config:IConfig) => Promise<{error:string;result:string}>;

    signMessage: (msgParams: any,config:IConfig)  => Promise<{error:string;result:string}>;

    relay: (payload: IPayload,config:IConfig)  => Promise<{ error: string; result: any }>;

    showWidget : (config:IConfig) => Promise<void>;

    setConfig: (config: IConfig) => Promise<void>;

    batchSignMessage: (config: IConfig,signArr:Array<SignWrapped>)  => Promise<{error:string;result:Array<SignWrapped>}>;

    requestAccount: (config: IConfig,accountId?:string) => Promise<{error: string, result: AccountModel}>;

    calcGasPrice: (gasLimitHex:string,chain:ChainType,config: IConfig) => Promise<{error: string, result: string}>; //return gas price hex

    setLanguage: (lang:string) => Promise<void>;

    checkAccess: () => Promise<boolean>;
}

export interface SignWrapped{
    address: string
    chain: ChainType
    msg:any;
    result?:any;
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
    result?:any;
    error?:any
}

export interface IWidget {
    communication: AsyncMethodReturns<IMethods>;
    widgetFrame: HTMLDivElement;
}