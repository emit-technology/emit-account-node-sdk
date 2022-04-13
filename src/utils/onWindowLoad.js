"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onWindowLoad = void 0;
var _1 = require("./");
var loaded = false;
function onWindowLoad() {
    return new Promise(function (resolve, reject) {
        if (!_1.isClient()) {
            reject();
        }
        else if (loaded) {
            resolve();
        }
        else if (['loaded', 'interactive', 'complete'].indexOf(document.readyState) > -1) {
            loaded = true;
            resolve();
        }
        else {
            window.addEventListener('load', function () {
                loaded = true;
                resolve();
            }, false);
        }
    });
}
exports.onWindowLoad = onWindowLoad;
