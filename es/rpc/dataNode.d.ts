import Rpc from "./index";
import { BlockWrapped, DataSet, Factor, FactorSet, PrepareBlock } from "@emit-technology/emit-lib";
import { ConfirmedAccount, SettleResp } from "@emit-technology/emit-lib";
import { IConfig, IMethods } from "../types";
import { AsyncMethodReturns } from "penpal";
export declare class DataNode extends Rpc {
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
