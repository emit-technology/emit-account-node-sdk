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
var _a = require('ethereumjs-util'), addHexPrefix = _a.addHexPrefix, stripHexPrefix = _a.stripHexPrefix, BN = _a.BN;
var SIMPLE_GAS_COST = '0x5208'; // Hex for 21000, cost of a simple send.
export function getTxGas(query, txParams) {
    return __awaiter(this, void 0, void 0, function () {
        var block, _a, safeGas, simpleSend, gasLimitSpecified, gas, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, query.getBlockByNumber('latest', false)];
                case 1:
                    block = _b.sent();
                    return [4 /*yield*/, safeTxGas(query, txParams, block.gasLimit)];
                case 2:
                    _a = _b.sent(), safeGas = _a.safeGas, simpleSend = _a.simpleSend, gasLimitSpecified = _a.gasLimitSpecified;
                    if (simpleSend || gasLimitSpecified) {
                        return [2 /*return*/, safeGas];
                    }
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, estimateTxGas(query, txParams, block.gasLimit, safeGas)];
                case 4:
                    gas = _b.sent();
                    return [2 /*return*/, gas];
                case 5:
                    error_1 = _b.sent();
                    return [2 /*return*/, safeGas];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function safeTxGas(query, txParams, blockGasLimitHex) {
    return __awaiter(this, void 0, void 0, function () {
        var gasLimitSpecified, recipient, hasRecipient, code, codeIsEmpty, err, blockGasLimitBN, saferGasLimitBN;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gasLimitSpecified = Boolean(txParams.gas);
                    // if it is, use that value
                    if (gasLimitSpecified) {
                        return [2 /*return*/, { safeGas: txParams.gas, simpleSend: false, gasLimitSpecified: true }];
                    }
                    recipient = txParams.to;
                    hasRecipient = Boolean(recipient);
                    if (!hasRecipient) return [3 /*break*/, 2];
                    return [4 /*yield*/, query.getCode(recipient)];
                case 1:
                    code = _a.sent();
                    codeIsEmpty = !code || code === '0x' || code === '0x0';
                    if (codeIsEmpty) {
                        // if there's data in the params, but there's no contract code, it's not a valid transaction
                        if (txParams.data) {
                            err = new Error('Trying to call a function on a non-contract address');
                            throw err;
                        }
                        // This is a standard ether simple send, gas requirement is exactly 21k
                        return [2 /*return*/, { safeGas: SIMPLE_GAS_COST, simpleSend: true, gasLimitSpecified: false }];
                    }
                    _a.label = 2;
                case 2:
                    blockGasLimitBN = hexToBn(blockGasLimitHex);
                    saferGasLimitBN = BnMultiplyByFraction(blockGasLimitBN, 19, 20);
                    return [2 /*return*/, { safeGas: bnToHex(saferGasLimitBN), simpleSend: false, gasLimitSpecified: false }];
            }
        });
    });
}
function estimateTxGas(query, txParams, blockGasLimitHex, safeGas) {
    return __awaiter(this, void 0, void 0, function () {
        var estimatedGas, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    txParams.gas = safeGas;
                    _a = addHexPrefix;
                    return [4 /*yield*/, query.estimateGas(txParams)];
                case 1:
                    estimatedGas = _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/, addGasBuffer(estimatedGas, blockGasLimitHex)];
            }
        });
    });
}
function addGasBuffer(initialGasLimitHex, blockGasLimitHex) {
    var initialGasLimitBn = hexToBn(initialGasLimitHex);
    var blockGasLimitBn = hexToBn(blockGasLimitHex);
    var upperGasLimitBn = blockGasLimitBn.muln(0.9);
    var bufferedGasLimitBn = initialGasLimitBn.muln(1.5);
    // if initialGasLimit is above blockGasLimit, dont modify it
    if (initialGasLimitBn.gt(upperGasLimitBn))
        return bnToHex(initialGasLimitBn);
    // if bufferedGasLimit is below blockGasLimit, use bufferedGasLimit
    if (bufferedGasLimitBn.lt(upperGasLimitBn))
        return bnToHex(bufferedGasLimitBn);
    // otherwise use blockGasLimit
    return bnToHex(upperGasLimitBn);
}
function hexToBn(inputHex) {
    return new BN(stripHexPrefix(inputHex), 16);
}
function bnToHex(inputBn) {
    return addHexPrefix(inputBn.toString(16));
}
function BnMultiplyByFraction(targetBN, numerator, denominator) {
    var numBN = new BN(numerator);
    var denomBN = new BN(denominator);
    return targetBN.mul(numBN).div(denomBN);
}
//# sourceMappingURL=gas.js.map