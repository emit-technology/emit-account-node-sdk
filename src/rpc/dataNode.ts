import Rpc from "./index";
import {
  Block,
  BlockWrapped,
  DataSet,
  Factor,
  FactorSet,
  getDefaultHash,
  PrepareBlock,ConfirmedAccount,
} from "../types/emit";
import { METHOD } from "./method";
import emitUtils from "../utils/emitUtils";
import {IConfig, IMethods, SettleResp} from "../types";
import BigNumber from "bignumber.js";
import {AsyncMethodReturns} from "penpal";

export class DataNode extends Rpc {

  constructor(host:string,private getWidgetCommunication: () => Promise<AsyncMethodReturns<IMethods>>,private config:IConfig) {
    super(host);
  }

  getConfirmedAccount = async (address: string): Promise<ConfirmedAccount> => {
    return await this.post(METHOD.getConfirmedAccount, [address]);
  };

  getConfirmedBlock = async (address: string): Promise<BlockWrapped> => {
    return await this.post(METHOD.getConfirmedBlock, [address]);
  };

  getData = async (address: string, key: string) => {
    return await this.post(METHOD.getData, [address, emitUtils.strToHex(key, 32)]);
  };

  getBlock = async (address: string, num: any) => {
    return await this.post(METHOD.getBlock, [
      address,
      new BigNumber(num).toNumber(),
    ]);
  };

  toHex(str: string, len?: number) {
    if (len) {
      const buf = Buffer.alloc(len, 0);
      const strBuf = Buffer.from(str);
      return buf
        .fill(strBuf, 0, strBuf.length > 32 ? 32 : strBuf.length)
        .toString("hex");
    }
    return Buffer.from(str).toString("hex");
  }

  getLatestBlocks = async (
    address: string,
    pageSize: number = 10
  ): Promise<Array<BlockWrapped>> => {
    return await this.post(METHOD.getLatestBlocks, [address, pageSize]);
  };

  getSettles = async (address: string): Promise<Array<SettleResp>> => {
    const rest: Array<SettleResp> = await this.post(METHOD.getSettles, [
      address,
    ]);
    rest.sort(this.compareSettles);
    return rest;
  };

  compareSettles = (a: SettleResp, b: SettleResp) => {
    if (a.factor.timestamp < b.factor.timestamp) {
      return 1;
    } else if (a.factor.timestamp > b.factor.timestamp) {
      return -1;
    }
    return 0;
  };

  getFactors = async (address: string): Promise<Array<Factor>> => {
    return await this.post(METHOD.getFactors, [address]);
  };

  checkAccount = async (address: string) => {
    return await this.post(METHOD.checkAccount, [address]);
  };

  genPrepareBlock = async (
    address: string,
    data_sets: Array<DataSet>,
    factor_set: FactorSet,
    data?: string
  ): Promise<PrepareBlock> => {
    const convertSet: Array<DataSet> = [];
    data_sets.forEach((v: DataSet) => {
      convertSet.push({
        name: this.toHex(v.name, 32),
        data: this.toHex(v.data),
      });
    });

    const blk: Block = {
      num: 0,
      timestamp: Math.ceil(Date.now() / 1000),
      parent_hash: getDefaultHash(),
      data_sets: convertSet,
      data: "",
      factor_set: factor_set,
    };
    if (data) {
      blk.data = Buffer.from(data).toString("hex");
    }
    const blk_wrapped = await this.getConfirmedBlock(address);
    const cfm_blk: Block | undefined = blk_wrapped
      ? blk_wrapped.block
      : undefined;
    const cfm_act = await this.getConfirmedAccount(address);
    if (
      cfm_act &&
      cfm_blk &&
      cfm_act.blk_ref &&
      cfm_act.blk_ref.num !== cfm_blk.num
    ) {
      return Promise.reject(
        "The num of confirmed Account is not same with the num of confirmed block!"
      );
    }

    if (cfm_blk && cfm_act) {
      blk.num = cfm_blk.num + 1;
      if (cfm_blk.parent_hash) {
        blk.parent_hash = cfm_act.blk_ref.hash;
      }
    }

    const blkData: PrepareBlock = {
      address: address,
      blk: blk,
    };

    return Promise.resolve(blkData);
  };

  prepareBlock = async (
    prepareBlock: PrepareBlock
  ): Promise<boolean> => {
    const signData: any = (await this.getWidgetCommunication() ).signTransaction(prepareBlock,this.config)
    if (!signData) {
      return Promise.reject("sign error");
    }
    const rest = await this.post(METHOD.prepareBlock, [signData]);
    return Promise.resolve(rest);
  };
}
// const defaultHost = () => {
//   let protocol = window.location.protocol;
//   let host = window.location.hostname;
//   let port = window.location.port;
//   return `${protocol}//${host}:${parseInt(port) - 1}`;
// };
