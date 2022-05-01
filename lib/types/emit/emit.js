"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainType = exports.CreateType = void 0;
var CreateType;
(function (CreateType) {
    CreateType[CreateType["Mnemonic"] = 0] = "Mnemonic";
    CreateType[CreateType["PrivateKey"] = 1] = "PrivateKey";
})(CreateType = exports.CreateType || (exports.CreateType = {}));
var ChainType;
(function (ChainType) {
    ChainType[ChainType["_"] = 0] = "_";
    ChainType[ChainType["SERO"] = 1] = "SERO";
    ChainType[ChainType["ETH"] = 2] = "ETH";
    ChainType[ChainType["TRON"] = 3] = "TRON";
    ChainType[ChainType["BSC"] = 4] = "BSC";
    ChainType[ChainType["EMIT"] = 5] = "EMIT";
})(ChainType = exports.ChainType || (exports.ChainType = {}));
//# sourceMappingURL=emit.js.map