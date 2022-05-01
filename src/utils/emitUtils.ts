import { Category } from "../types";
import BigNumber from "bignumber.js";
const BN = require("bn.js");

const NODE_ADDRESS = (): string => {
  return process.env.NODE_ENV === "development"
      ? "EYwQ9VJXjeeYpS7xjjPBgAojgcRQbo5VFvAhaRVrBXVhUEyAt"
      : "EaWt4Q2yLcthiETUJNadA1ihHiP4JDd4uPtSN4Rku74PS5aoi";
};

class EmitUtils {
  strToHex = (v: string, len: number = 32) => {
    const buf = Buffer.alloc(len, 0);
    const dataBuf = Buffer.from(v);
    if (dataBuf.length > len) {
      throw new Error("str is too long");
    }
    return buf.fill(dataBuf, 0, dataBuf.length).toString("hex");
  };

  fromHex(v: string): any {
    if (!v) {
      return "";
    }
    return Buffer.from(v, "hex").toString();
  }

  // toHex(v: string, len?: number) {
  //   if (!v) {
  //     return "";
  //   }
  //   if (len) {
  //     return new BN(v).toArrayLike(Buffer, "le", len).toString("hex");
  //   }
  //   return Buffer.from(v).toString("hex");
  // }

  toValueHex(v: any, decimal: number = 18) {
    const cv = new BigNumber(v).multipliedBy(10 ** decimal).toString(16);
    return new BN(cv, "hex").toArrayLike(Buffer, "le", 32).toString("hex");
  }

  toHash(v: string): string {
    return Buffer.alloc(32, 0)
      .fill(Buffer.from(v), 0, Buffer.from(v).length)
      .toString("hex");
  }

  ellipsisStr = (v: string, num?: number): string => {
    if (!v) return "";
    if (!num) {
      num = 7;
    }
    if (v.length >= 15) {
      return v.slice(0, num) + " ... " + v.slice(v.length - num, v.length);
    }
    return v;
  };

  getCategoryName = (category: Category): string => {
    const name = this.fromHex(category.name);
    if (
      category.field === NODE_ADDRESS() &&
      category.name ===
        "0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      return "EASTER";
    }
    return name;
  };

  fromValue = (v: string, decimal: number = 18): BigNumber => {
    return new BigNumber(new BN(v, "hex", "le").toString()).dividedBy(
      10 ** decimal
    );
  };

  formatValue = (v: string, decimal: number = 18): string => {
    return this.nFormatter(
      new BigNumber(new BN(v, "hex", "le").toString()).dividedBy(10 ** decimal),
      5
    );
  };

  nFormatter(n: number | BigNumber | string | undefined, digits: number) {
    if (!n) {
      return "0";
    }
    const num = new BigNumber(n).toNumber();
    const si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  formatDate = (seconds: number) => {
    return `${new Date(seconds * 1000).toLocaleTimeString()} ${new Date(
      seconds * 1000
    ).toLocaleDateString()}`;
  };

  testMath() {
    console.log("TestMathPow");
    return 1 ** 2;
  }
}
const emitUtils = new EmitUtils();

export default emitUtils;
