"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClient = void 0;
function isClient() {
    return !!(typeof window !== 'undefined' && window.document);
}
exports.isClient = isClient;
//# sourceMappingURL=isClient.js.map