import { IConfig } from "./";
import { AsyncMethodReturns } from 'penpal';
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
