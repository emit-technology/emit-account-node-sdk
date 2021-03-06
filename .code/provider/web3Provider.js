"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Web3Manager = void 0;
var network_1 = require("../network");
var utils_1 = require("../utils");
var ProviderEngine = require('web3-provider-engine');
// const CacheSubprovider = require('web3-provider-engine/dist/es5/subproviders/cache.js');
var FixtureSubprovider = require('web3-provider-engine/dist/es5/subproviders/fixture.js');
// const FilterSubprovider = require('web3-provider-engine/dist/es5/subproviders/filters.js');
var HookedWalletSubprovider = require('web3-provider-engine/dist/es5/subproviders/hooked-wallet.js');
var Web3Manager = /** @class */ (function () {
    function Web3Manager(config, _getWidgetCommunication) {
        this.config = config;
        this._getWidgetCommunication = _getWidgetCommunication;
        this.provider = this._initProvider();
    }
    Web3Manager.prototype.setSelectedAddress = function (selectedAddress) {
        this._selectedAddress = selectedAddress;
    };
    Web3Manager.prototype.changeNetwork = function (network) {
        var newNetwork = network_1.networkAdapter(network);
        // this.clearSubprovider(NonceSubprovider);
        // this.clearSubprovider(CacheSubprovider);
        this.config.network = newNetwork;
    };
    Web3Manager.prototype._initProvider = function () {
        var _this = this;
        // don't init the engine twice
        if (this.engine) {
            return this.engine;
        }
        this.engine = new ProviderEngine({ pollingInterval: 5 * 60 * 1000 }); //300seconds
        var query = new utils_1.EthQuery(this.engine);
        if (this.config.network.chainId === "sero") {
            query = new utils_1.SeroQuery(this.engine);
        }
        this.engine.send = function (payload, callback) {
            // Web3 1.0 beta.38 (and above) calls `send` with method and parameters
            if (typeof payload === 'string') {
                return new Promise(function (resolve, reject) {
                    _this.engine.sendAsync({
                        jsonrpc: '2.0',
                        id: 32,
                        method: payload,
                        params: callback || [],
                    }, function (error, response) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(response.result);
                        }
                    });
                });
            }
            // Web3 1.0 beta.37 (and below) uses `send` with a callback for async queries
            if (callback) {
                _this.engine.sendAsync(payload, callback);
                return;
            }
            var result = null;
            switch (payload.method) {
                case 'eth_accounts':
                    result = _this._selectedAddress ? [_this._selectedAddress] : [];
                    break;
                case 'eth_coinbase':
                    result = _this._selectedAddress ? [_this._selectedAddress] : [];
                    break;
                case 'net_version':
                    result = _this._network;
                    break;
                case 'eth_uninstallFilter':
                    _this.engine.sendAsync(payload, function (_) { return _; });
                    result = true;
                    break;
                default:
                    var message = "The EMIT Web3 object does not support synchronous methods like " + payload.method + " without a callback parameter.";
                    throw new Error(message);
            }
            return {
                id: payload.id,
                jsonrpc: payload.jsonrpc,
                result: result,
            };
        };
        this.engine.addProvider(new FixtureSubprovider({
            web3_clientVersion: "EMIT/v" + this.config.version + "/javascript",
            net_listening: false,
            eth_hashrate: '0x00',
            eth_mining: false,
            eth_syncing: false,
        }));
        // cache layer
        // this.engine.addProvider(new CacheSubprovider());
        // subscriptions manager
        // this.engine.addProvider(new SubscriptionsSubprovider());
        // filters
        // this.engine.addProvider(new FilterSubprovider());
        // pending nonce
        // this.engine.addProvider(new NonceSubprovider());
        //
        // // data source
        // this.engine.addProvider(new RpcSubprovider({
        //     rpcUrl: this.config.network.nodeUrl,
        // }));
        // set default id when needed
        this.engine.addProvider({
            setEngine: function (_) { return _; },
            handleRequest: function (payload, next) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!payload.id) {
                        payload.id = 42;
                    }
                    next();
                    return [2 /*return*/];
                });
            }); },
        });
        // main web3 functionality - carried out via widget communication
        this.engine.addProvider(new HookedWalletSubprovider({
            getAccounts: function (cb) { return __awaiter(_this, void 0, void 0, function () {
                var widgetCommunication, _a, error, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this._getWidgetCommunication()];
                        case 1:
                            widgetCommunication = _b.sent();
                            return [4 /*yield*/, widgetCommunication.getAccounts(this.config)];
                        case 2:
                            _a = _b.sent(), error = _a.error, result = _a.result;
                            if (!error && result) {
                                // @ts-ignore
                                this._selectedAddress = result[0];
                            }
                            cb(error, result);
                            return [2 /*return*/];
                    }
                });
            }); },
            signTransaction: function (txParams, cb) { return __awaiter(_this, void 0, void 0, function () {
                var widgetCommunication, _a, error, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this._getWidgetCommunication()];
                        case 1:
                            widgetCommunication = _b.sent();
                            return [4 /*yield*/, widgetCommunication.signTransaction(txParams, this.config)];
                        case 2:
                            _a = _b.sent(), error = _a.error, result = _a.result;
                            cb(error, result);
                            return [2 /*return*/];
                    }
                });
            }); },
            signMessage: function (msgParams, cb) { return __awaiter(_this, void 0, void 0, function () {
                var widgetCommunication, params, ret, error, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._getWidgetCommunication()];
                        case 1:
                            widgetCommunication = _a.sent();
                            params = __assign(__assign({}, msgParams), { messageStandard: 'signMessage' });
                            return [4 /*yield*/, widgetCommunication.signMessage(params, this.config)];
                        case 2:
                            ret = _a.sent();
                            error = ret.error, result = ret.result;
                            cb(error, result);
                            return [2 /*return*/];
                    }
                });
            }); },
            signPersonalMessage: function (msgParams, cb) { return __awaiter(_this, void 0, void 0, function () {
                var widgetCommunication, params, ret, error, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._getWidgetCommunication()];
                        case 1:
                            widgetCommunication = _a.sent();
                            params = __assign(__assign({}, msgParams), { messageStandard: 'signPersonalMessage' });
                            return [4 /*yield*/, widgetCommunication.signMessage(params, this.config)];
                        case 2:
                            ret = _a.sent();
                            error = ret.error, result = ret.result;
                            cb(error, result);
                            return [2 /*return*/];
                    }
                });
            }); },
            signTypedMessage: function (msgParams, cb) { return __awaiter(_this, void 0, void 0, function () {
                var widgetCommunication, params, _a, error, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this._getWidgetCommunication()];
                        case 1:
                            widgetCommunication = _b.sent();
                            params = __assign(__assign({}, msgParams), { messageStandard: 'signTypedMessage' });
                            return [4 /*yield*/, widgetCommunication.signMessage(params, this.config)];
                        case 2:
                            _a = _b.sent(), error = _a.error, result = _a.result;
                            cb(error, result);
                            return [2 /*return*/];
                    }
                });
            }); },
            signTypedMessageV3: function (msgParams, cb) { return __awaiter(_this, void 0, void 0, function () {
                var widgetCommunication, params, _a, error, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this._getWidgetCommunication()];
                        case 1:
                            widgetCommunication = _b.sent();
                            params = __assign(__assign({}, msgParams), { messageStandard: 'signTypedMessageV3' });
                            return [4 /*yield*/, widgetCommunication.signMessage(params, this.config)];
                        case 2:
                            _a = _b.sent(), error = _a.error, result = _a.result;
                            cb(error, result);
                            return [2 /*return*/];
                    }
                });
            }); },
            signTypedMessageV4: function (msgParams, cb) { return __awaiter(_this, void 0, void 0, function () {
                var widgetCommunication, params, _a, error, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this._getWidgetCommunication()];
                        case 1:
                            widgetCommunication = _b.sent();
                            params = __assign(__assign({}, msgParams), { messageStandard: 'signTypedMessageV4' });
                            return [4 /*yield*/, widgetCommunication.signMessage(params, this.config)];
                        case 2:
                            _a = _b.sent(), error = _a.error, result = _a.result;
                            cb(error, result);
                            return [2 /*return*/];
                    }
                });
            }); },
            estimateGas: function (txParams, cb) { return __awaiter(_this, void 0, void 0, function () {
                var gas;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, utils_1.getTxGas(query, txParams)];
                        case 1:
                            gas = _a.sent();
                            cb(null, gas);
                            return [2 /*return*/];
                    }
                });
            }); },
        }));
        this.engine.addProvider({
            setEngine: function (_) { return _; },
            handleRequest: function (payload, next, end) { return __awaiter(_this, void 0, void 0, function () {
                var widgetCommunication, ret, error, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._getWidgetCommunication()];
                        case 1:
                            widgetCommunication = _a.sent();
                            return [4 /*yield*/, widgetCommunication.relay(payload, this.config)];
                        case 2:
                            ret = _a.sent();
                            error = ret.error, result = ret.result;
                            if (payload.method === 'net_version') {
                                this._network = result;
                                this.engine.networkVersion = this._network;
                            }
                            end(error, result);
                            return [2 /*return*/];
                    }
                });
            }); },
        });
        this.engine.enable = function () {
            return new Promise(function (resolve, reject) {
                //this.config.network.chainType == ChainType.SERO?"sero_accounts":
                _this.engine.sendAsync({ method: "eth_accounts" }, function (error, response) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(response.result);
                    }
                });
            });
        };
        this.engine.isConnected = function () {
            return true;
        };
        this.engine.isEmit = true;
        this.engine.on('error', function (error) {
            if (error && error.message && error.message.includes('PollingBlockTracker')) {
                console.warn('If you see this warning constantly, there might be an error with your RPC node.');
            }
            else {
                console.error(error);
            }
        });
        this.engine.start();
        return this.engine;
    };
    return Web3Manager;
}());
exports.Web3Manager = Web3Manager;
//# sourceMappingURL=web3Provider.js.map