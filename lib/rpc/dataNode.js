"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataNode = void 0;
var index_1 = require("./index");
var emit_1 = require("../types/emit");
var method_1 = require("./method");
var emitUtils_1 = require("../utils/emitUtils");
var bignumber_js_1 = require("bignumber.js");
var DataNode = /** @class */ (function (_super) {
    __extends(DataNode, _super);
    function DataNode(host, getWidgetCommunication, config) {
        var _this = _super.call(this, host) || this;
        _this.getWidgetCommunication = getWidgetCommunication;
        _this.config = config;
        _this.getConfirmedAccount = function (address) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(method_1.METHOD.getConfirmedAccount, [address])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.getConfirmedBlock = function (address) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(method_1.METHOD.getConfirmedBlock, [address])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.getData = function (address, key) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(method_1.METHOD.getData, [address, emitUtils_1.default.strToHex(key, 32)])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.getBlock = function (address, num) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(method_1.METHOD.getBlock, [
                            address,
                            new bignumber_js_1.default(num).toNumber(),
                        ])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.getLatestBlocks = function (address, pageSize) {
            if (pageSize === void 0) { pageSize = 10; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.post(method_1.METHOD.getLatestBlocks, [address, pageSize])];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.getSettles = function (address) { return __awaiter(_this, void 0, void 0, function () {
            var rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(method_1.METHOD.getSettles, [
                            address,
                        ])];
                    case 1:
                        rest = _a.sent();
                        rest.sort(this.compareSettles);
                        return [2 /*return*/, rest];
                }
            });
        }); };
        _this.compareSettles = function (a, b) {
            if (a.factor.timestamp < b.factor.timestamp) {
                return 1;
            }
            else if (a.factor.timestamp > b.factor.timestamp) {
                return -1;
            }
            return 0;
        };
        _this.getFactors = function (address) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(method_1.METHOD.getFactors, [address])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.checkAccount = function (address) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(method_1.METHOD.checkAccount, [address])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.genPrepareBlock = function (address, data_sets, factor_set, data) { return __awaiter(_this, void 0, void 0, function () {
            var convertSet, blk, blk_wrapped, cfm_blk, cfm_act, blkData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        convertSet = [];
                        data_sets.forEach(function (v) {
                            convertSet.push({
                                name: _this.toHex(v.name, 32),
                                data: _this.toHex(v.data),
                            });
                        });
                        blk = {
                            num: 0,
                            timestamp: Math.ceil(Date.now() / 1000),
                            parent_hash: (0, emit_1.getDefaultHash)(),
                            data_sets: convertSet,
                            data: "",
                            factor_set: factor_set,
                        };
                        if (data) {
                            blk.data = Buffer.from(data).toString("hex");
                        }
                        return [4 /*yield*/, this.getConfirmedBlock(address)];
                    case 1:
                        blk_wrapped = _a.sent();
                        cfm_blk = blk_wrapped
                            ? blk_wrapped.block
                            : undefined;
                        return [4 /*yield*/, this.getConfirmedAccount(address)];
                    case 2:
                        cfm_act = _a.sent();
                        if (cfm_act &&
                            cfm_blk &&
                            cfm_act.blk_ref &&
                            cfm_act.blk_ref.num !== cfm_blk.num) {
                            return [2 /*return*/, Promise.reject("The num of confirmed Account is not same with the num of confirmed block!")];
                        }
                        if (cfm_blk && cfm_act) {
                            blk.num = cfm_blk.num + 1;
                            if (cfm_blk.parent_hash) {
                                blk.parent_hash = cfm_act.blk_ref.hash;
                            }
                        }
                        blkData = {
                            address: address,
                            blk: blk,
                        };
                        return [2 /*return*/, Promise.resolve(blkData)];
                }
            });
        }); };
        _this.prepareBlock = function (prepareBlock) { return __awaiter(_this, void 0, void 0, function () {
            var signData, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWidgetCommunication()];
                    case 1:
                        signData = (_a.sent()).signTransaction(prepareBlock, this.config);
                        if (!signData) {
                            return [2 /*return*/, Promise.reject("sign error")];
                        }
                        return [4 /*yield*/, this.post(method_1.METHOD.prepareBlock, [signData])];
                    case 2:
                        rest = _a.sent();
                        return [2 /*return*/, Promise.resolve(rest)];
                }
            });
        }); };
        return _this;
    }
    DataNode.prototype.toHex = function (str, len) {
        if (len) {
            var buf = Buffer.alloc(len, 0);
            var strBuf = Buffer.from(str);
            return buf
                .fill(strBuf, 0, strBuf.length > 32 ? 32 : strBuf.length)
                .toString("hex");
        }
        return Buffer.from(str).toString("hex");
    };
    return DataNode;
}(index_1.default));
exports.DataNode = DataNode;
// const defaultHost = () => {
//   let protocol = window.location.protocol;
//   let host = window.location.hostname;
//   let port = window.location.port;
//   return `${protocol}//${host}:${parseInt(port) - 1}`;
// };
//# sourceMappingURL=dataNode.js.map