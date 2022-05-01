import { Category } from "../types";
import BigNumber from "bignumber.js";
declare class EmitUtils {
    strToHex: (v: string, len?: number) => string;
    fromHex(v: string): any;
    toValueHex(v: any, decimal?: number): any;
    toHash(v: string): string;
    ellipsisStr: (v: string, num?: number | undefined) => string;
    getCategoryName: (category: Category) => string;
    fromValue: (v: string, decimal?: number) => BigNumber;
    formatValue: (v: string, decimal?: number) => string;
    nFormatter(n: number | BigNumber | string | undefined, digits: number): string;
    formatDate: (seconds: number) => string;
    testMath(): number;
}
declare const emitUtils: EmitUtils;
export default emitUtils;
