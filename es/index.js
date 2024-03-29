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
import { networkAdapter } from './network';
import { onWindowLoad, validateSecureOrigin } from './utils';
import { windowLoadHandler, WidgetManager } from './widget';
import { Web3Manager } from './provider';
import { DataNode } from "./rpc/dataNode";
var VERSION = '1.2.2';
onWindowLoad()
    .then(windowLoadHandler)
    .catch(function () { }); // Prevents unhandledPromiseRejectionWarning, which happens when using React SSR;
var EmitBox = /** @class */ (function () {
    function EmitBox(dapp, network) {
        validateSecureOrigin();
        this._validateParams(network);
        this._config = {
            network: networkAdapter(network),
            version: VERSION,
            dapp: dapp
        };
        this._getWidgetCommunication = this._getWidgetCommunication.bind(this);
        this._widgetManagerInstance = new WidgetManager(this.config);
        this.changeNetwork = this.changeNetwork.bind(this);
        this.getWidget = this.getWidget.bind(this);
        this.onActiveWalletChanged = this.onActiveWalletChanged.bind(this);
        this.onError = this.onError.bind(this);
        this.showWidget = this.showWidget.bind(this);
        this.setSelectedAddress = this.setSelectedAddress.bind(this);
        this.newProvider = this.newProvider.bind(this);
        this.emitDataNode = new DataNode(this.config.network.nodeUrl, this._getWidgetCommunication, this._config);
    }
    Object.defineProperty(EmitBox.prototype, "_widgetManager", {
        get: function () {
            return this._widgetManagerInstance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmitBox.prototype, "_web3Manager", {
        get: function () {
            if (!this._web3ManagerInstance) {
                this._web3ManagerInstance = new Web3Manager(this.config, this._getWidgetCommunication);
            }
            return this._web3ManagerInstance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmitBox.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    EmitBox.prototype._getWidgetCommunication = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._widgetManager.getWidget()];
                    case 1: return [2 /*return*/, (_a.sent()).communication];
                }
            });
        });
    };
    Object.defineProperty(EmitBox.prototype, "web3Provider", {
        get: function () {
            return this._web3Manager.provider;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmitBox.prototype, "provider", {
        // Todo: deprecate
        get: function () {
            return this.web3Provider;
        },
        enumerable: false,
        configurable: true
    });
    EmitBox.prototype.newProvider = function (config) {
        return new Web3Manager(config, this._getWidgetCommunication).provider;
    };
    EmitBox.prototype.changeNetwork = function (network) {
        this._web3Manager.changeNetwork(network);
    };
    EmitBox.prototype.setSelectedAddress = function (address) {
        this._web3Manager.setSelectedAddress(address);
    };
    // async singleton
    EmitBox.prototype.getWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._widgetManager.getWidget()];
            });
        });
    };
    // Population by the dev of SDK callbacks that might be invoked by the widget
    EmitBox.prototype.onActiveWalletChanged = function (callback) {
        this._widgetManager.setOnActiveWalletChangedCallback(callback);
    };
    EmitBox.prototype.onActiveAccountChanged = function (callback) {
        this._widgetManager.setOnActiveAccountChangedCallback(callback);
    };
    EmitBox.prototype.onError = function (callback) {
        this._widgetManager.setOnErrorCallback(callback);
    };
    // SDK methods that could be invoked by the user and handled by the widget
    EmitBox.prototype.showWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._widgetManager.showWidget()];
            });
        });
    };
    EmitBox.prototype.batchSignMsg = function (signArr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._widgetManager.batchSignMsg(signArr)];
            });
        });
    };
    EmitBox.prototype.requestAccount = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._widgetManager.requestAccount(accountId)];
            });
        });
    };
    EmitBox.prototype.setLanguage = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._widgetManager.setLanguage(code)];
            });
        });
    };
    EmitBox.prototype.checkAccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._widgetManager.checkAccess()];
            });
        });
    };
    EmitBox.prototype.calcGasPrice = function (gasLimitHex, chain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._widgetManager.calcGasPrice(gasLimitHex, chain)];
            });
        });
    };
    // internal methods
    EmitBox.prototype._validateParams = function (network) {
        if (!network) {
            throw new Error("[EMIT] 'network' is required.");
        }
    };
    return EmitBox;
}());
export * from './types';
export default EmitBox;
//# sourceMappingURL=index.js.map