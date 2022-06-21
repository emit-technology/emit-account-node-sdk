"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeroQuery = exports.EthQuery = void 0;
var EthQuery = /** @class */ (function () {
    function EthQuery(provider) {
        this.provider = provider;
    }
    EthQuery.prototype.getBlockByNumber = function (blockNumber, fullTransaction) {
        return this.sendAsync('eth_getBlockByNumber', blockNumber, fullTransaction);
    };
    EthQuery.prototype.getCode = function (address) {
        return this.sendAsync('eth_getCode', address, 'latest');
    };
    EthQuery.prototype.estimateGas = function (txParams) {
        return this.sendAsync('eth_estimateGas', txParams);
    };
    EthQuery.prototype.sendAsync = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            _this.provider.sendAsync({
                id: 42,
                jsonrpc: '2.0',
                method: methodName,
                params: args,
            }, function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response.result);
                }
            });
        });
    };
    return EthQuery;
}());
exports.EthQuery = EthQuery;
var SeroQuery = /** @class */ (function () {
    function SeroQuery(provider) {
        this.provider = provider;
    }
    SeroQuery.prototype.getBlockByNumber = function (blockNumber, fullTransaction) {
        return this.sendAsync('sero_getBlockByNumber', blockNumber, fullTransaction);
    };
    SeroQuery.prototype.getCode = function (address) {
        return this.sendAsync('sero_getCode', address, 'latest');
    };
    SeroQuery.prototype.estimateGas = function (txParams) {
        return this.sendAsync('sero_estimateGas', txParams);
    };
    SeroQuery.prototype.sendAsync = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            _this.provider.sendAsync({
                id: 32,
                jsonrpc: '2.0',
                method: methodName,
                params: args,
            }, function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response.result);
                }
            });
        });
    };
    return SeroQuery;
}());
exports.SeroQuery = SeroQuery;
