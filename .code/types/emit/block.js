"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultHash = void 0;
var getDefaultHash = function () {
    var buf = Buffer.alloc(32, 0);
    return buf.toString("hex");
};
exports.getDefaultHash = getDefaultHash;
//# sourceMappingURL=block.js.map