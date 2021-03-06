import { isClient } from './';
var loaded = false;
export function onWindowLoad() {
    return new Promise(function (resolve, reject) {
        if (!isClient()) {
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
//# sourceMappingURL=onWindowLoad.js.map