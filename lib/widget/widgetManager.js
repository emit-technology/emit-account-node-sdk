"use strict";
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
exports.WidgetManager = exports.windowLoadHandler = void 0;
var penpal_1 = require("penpal");
var utils_1 = require("../utils");
var styles_1 = require("./styles");
// Create a .env file to override the default WIDGET_URL when running locally
var EMIT_WIDGET_URL = process.env.EMIT_WIDGET_URL || 'https://account.emit.technology/#/widget';
var EMIT_CONTAINER_CLASS = 'emit-widget-container';
var EMIT_IFRAME_CLASS = 'emit-widget-frame';
function windowLoadHandler() {
    if (document.getElementsByClassName(EMIT_CONTAINER_CLASS).length) {
        console.warn('EMIT script was already loaded. This might cause unexpected behavior. If loading with a script tag, please make sure that you only load it once.');
    }
}
exports.windowLoadHandler = windowLoadHandler;
var WidgetManager = /** @class */ (function () {
    function WidgetManager(_widgetConfig) {
        this._widgetConfig = _widgetConfig;
        this._widgetUrl = EMIT_WIDGET_URL;
        this._onErrorCallback = function () {
        };
        (0, utils_1.validateSecureOrigin)();
        WidgetManager._checkIfWidgetAlreadyInitialized();
    }
    // async singleton
    WidgetManager.prototype.getWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.widgetInstance) return [3 /*break*/, 2];
                        if (!this.widgetPromise) {
                            this.widgetPromise = this._initWidget();
                        }
                        _a = this;
                        return [4 /*yield*/, this.widgetPromise];
                    case 1:
                        _a.widgetInstance = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.widgetInstance];
                }
            });
        });
    };
    // Population by the dev of SDK callbacks that might be invoked by the widget
    WidgetManager.prototype.setOnActiveWalletChangedCallback = function (callback) {
        this._onActiveWalletChangedCallback = callback;
    };
    WidgetManager.prototype.setOnActiveAccountChangedCallback = function (callback) {
        this._onActiveAccountChangedCallback = callback;
    };
    WidgetManager.prototype.setOnErrorCallback = function (callback) {
        this._onErrorCallback = callback;
    };
    // SDK methods that could be invoked by the user and handled by the widget
    WidgetManager.prototype.showWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            var widgetCommunication;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWidget()];
                    case 1:
                        widgetCommunication = (_a.sent()).communication;
                        return [2 /*return*/, widgetCommunication.showWidget(this._widgetConfig)];
                }
            });
        });
    };
    WidgetManager.prototype.requestAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var widgetCommunication;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWidget()];
                    case 1:
                        widgetCommunication = (_a.sent()).communication;
                        return [2 /*return*/, widgetCommunication.requestAccount(this._widgetConfig)];
                }
            });
        });
    };
    WidgetManager.prototype.calcGasPrice = function (gasLimitHex, chain) {
        return __awaiter(this, void 0, void 0, function () {
            var widgetCommunication;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWidget()];
                    case 1:
                        widgetCommunication = (_a.sent()).communication;
                        return [2 /*return*/, widgetCommunication.calcGasPrice(gasLimitHex, chain, this._widgetConfig)];
                }
            });
        });
    };
    WidgetManager.prototype.batchSignMsg = function (signArr) {
        return __awaiter(this, void 0, void 0, function () {
            var widgetCommunication, _a, error, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getWidget()];
                    case 1:
                        widgetCommunication = (_b.sent()).communication;
                        return [4 /*yield*/, widgetCommunication.batchSignMessage(this._widgetConfig, signArr)];
                    case 2:
                        _a = _b.sent(), error = _a.error, result = _a.result;
                        if (error) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // internal methods
    WidgetManager._checkIfWidgetAlreadyInitialized = function () {
        if (document.getElementsByClassName(EMIT_CONTAINER_CLASS).length) {
            console.warn('An instance of EMIT was already initialized. This is probably a mistake. Make sure that you use the same EMIT instance throughout your app.');
        }
    };
    WidgetManager.prototype._initWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            var style, container, widgetFrame, iframe, connection, communication;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.onWindowLoad)()];
                    case 1:
                        _a.sent();
                        style = document.createElement('style');
                        style.innerHTML = styles_1.styles;
                        container = document.createElement('div');
                        container.className = EMIT_CONTAINER_CLASS;
                        widgetFrame = document.createElement('div');
                        widgetFrame.id = "emit-container-".concat(Date.now());
                        widgetFrame.className = EMIT_IFRAME_CLASS;
                        iframe = document.createElement('iframe');
                        console.log("init...", this._widgetUrl, this);
                        iframe.src = this._widgetUrl;
                        iframe.style.position = 'absolute';
                        iframe.style.height = '100%';
                        iframe.style.width = '100%';
                        iframe.style.border = '0 transparent';
                        // This conditional is not Penpal-specific. It's merely
                        // an example of how you can add an iframe to the document.
                        if (document.readyState === 'complete' ||
                            document.readyState === 'interactive') {
                            // widgetTitle.appendChild(closeBtm);
                            // widgetFrame.appendChild(widgetTitle);
                            // widgetFrame.appendChild(widgetUrl);
                            widgetFrame.appendChild(iframe);
                            container.appendChild(widgetFrame);
                            document.body.appendChild(container);
                            document.head.appendChild(style);
                        }
                        else {
                            document.addEventListener('DOMContentLoaded', function () {
                                widgetFrame.appendChild(iframe);
                                container.appendChild(widgetFrame);
                                document.body.appendChild(container);
                                document.head.appendChild(style);
                            });
                        }
                        connection = (0, penpal_1.connectToChild)({
                            iframe: iframe,
                            methods: {
                                setHeight: this._setHeight.bind(this),
                                getWindowSize: WidgetManager._getWindowSize.bind(this),
                                onActiveWalletChanged: this._onActiveWalletChanged.bind(this),
                                onActiveAccountChanged: this._onActiveAccountChanged.bind(this),
                                hasOnActiveWalletChanged: this.hasOnActiveWalletChanged.bind(this),
                                onError: this._onError.bind(this),
                            },
                        });
                        return [4 /*yield*/, connection.promise];
                    case 2:
                        communication = _a.sent();
                        return [4 /*yield*/, communication.setConfig(this._widgetConfig)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { communication: communication, widgetFrame: widgetFrame }];
                }
            });
        });
    };
    WidgetManager.prototype._setHeight = function (height) {
        return __awaiter(this, void 0, void 0, function () {
            var widgetFrame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWidget()];
                    case 1:
                        widgetFrame = (_a.sent()).widgetFrame;
                        if (height) {
                            widgetFrame.style.height = height;
                            widgetFrame.style.width = "100%";
                        }
                        else {
                            widgetFrame.style.height = '0';
                            widgetFrame.style.width = '0';
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WidgetManager._getWindowSize = function () {
        var body = document.getElementsByTagName('body')[0];
        var width = window.innerWidth || document.documentElement.clientWidth || body.clientWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
        return { width: width, height: height };
    };
    WidgetManager.prototype._onActiveWalletChanged = function (walletAddress) {
        if (this._onActiveWalletChangedCallback) {
            this._onActiveWalletChangedCallback(walletAddress);
        }
    };
    WidgetManager.prototype._onActiveAccountChanged = function (account) {
        if (this._onActiveAccountChangedCallback) {
            this._onActiveAccountChangedCallback(account);
        }
    };
    WidgetManager.prototype.hasOnActiveWalletChanged = function () {
        return !!this._onActiveWalletChangedCallback;
    };
    WidgetManager.prototype._onError = function (error) {
        if (this._onErrorCallback) {
            this._onErrorCallback(error);
        }
    };
    return WidgetManager;
}());
exports.WidgetManager = WidgetManager;
//# sourceMappingURL=widgetManager.js.map