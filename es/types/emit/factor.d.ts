import { OutFactor } from "./block";
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
