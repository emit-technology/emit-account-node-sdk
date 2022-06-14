import BigNumber from "bignumber.js";
var BN = require("bn.js");
var NODE_ADDRESS = function () {
    return process.env.NODE_ENV === "development"
        ? "EYwQ9VJXjeeYpS7xjjPBgAojgcRQbo5VFvAhaRVrBXVhUEyAt"
        : "EaWt4Q2yLcthiETUJNadA1ihHiP4JDd4uPtSN4Rku74PS5aoi";
};
var EmitUtils = /** @class */ (function () {
    function EmitUtils() {
        var _this = this;
        this.strToHex = function (v, len) {
            if (len === void 0) { len = 32; }
            var buf = Buffer.alloc(len, 0);
            var dataBuf = Buffer.from(v);
            if (dataBuf.length > len) {
                throw new Error("str is too long");
            }
            return buf.fill(dataBuf, 0, dataBuf.length).toString("hex");
        };
        this.ellipsisStr = function (v, num) {
            if (!v)
                return "";
            if (!num) {
                num = 7;
            }
            if (v.length >= 15) {
                return v.slice(0, num) + " ... " + v.slice(v.length - num, v.length);
            }
            return v;
        };
        this.getCategoryName = function (category) {
            var name = _this.fromHex(category.symbol);
            if (category.supplier === NODE_ADDRESS() &&
                category.symbol ===
                    "0000000000000000000000000000000000000000000000000000000000000000") {
                return "EASTER";
            }
            return name;
        };
        this.fromValue = function (v, decimal) {
            if (decimal === void 0) { decimal = 18; }
            return new BigNumber(new BN(v, "hex", "le").toString()).dividedBy(Math.pow(10, decimal));
        };
        this.formatValue = function (v, decimal) {
            if (decimal === void 0) { decimal = 18; }
            return _this.nFormatter(new BigNumber(new BN(v, "hex", "le").toString()).dividedBy(Math.pow(10, decimal)), 5);
        };
        this.formatDate = function (seconds) {
            return "".concat(new Date(seconds * 1000).toLocaleTimeString(), " ").concat(new Date(seconds * 1000).toLocaleDateString());
        };
    }
    EmitUtils.prototype.fromHex = function (v) {
        if (!v) {
            return "";
        }
        return Buffer.from(v, "hex").toString();
    };
    // toHex(v: string, len?: number) {
    //   if (!v) {
    //     return "";
    //   }
    //   if (len) {
    //     return new BN(v).toArrayLike(Buffer, "le", len).toString("hex");
    //   }
    //   return Buffer.from(v).toString("hex");
    // }
    EmitUtils.prototype.toValueHex = function (v, decimal) {
        if (decimal === void 0) { decimal = 18; }
        var cv = new BigNumber(v).multipliedBy(Math.pow(10, decimal)).toString(16);
        return new BN(cv, "hex").toArrayLike(Buffer, "le", 32).toString("hex");
    };
    EmitUtils.prototype.toHash = function (v) {
        return Buffer.alloc(32, 0)
            .fill(Buffer.from(v), 0, Buffer.from(v).length)
            .toString("hex");
    };
    EmitUtils.prototype.nFormatter = function (n, digits) {
        if (!n) {
            return "0";
        }
        var num = new BigNumber(n).toNumber();
        var si = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "K" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" },
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    };
    EmitUtils.prototype.testMath = function () {
        console.log("TestMathPow");
        return Math.pow(1, 2);
    };
    return EmitUtils;
}());
var emitUtils = new EmitUtils();
export default emitUtils;
//# sourceMappingURL=emitUtils.js.map