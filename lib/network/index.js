"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkAdapter = void 0;
var types_1 = require("../types");
function networkAdapter(network) {
    var networkObj = typeof network === 'string' ? Object.assign({}, networks[network]) : network;
    if (typeof networkObj !== 'object') {
        throw new Error("[EMIT] illegal 'network' parameter.");
    }
    if (!networkObj.nodeUrl) {
        throw new Error("[EMIT] 'nodeUrl' is required.");
    }
    return networkObj;
}
exports.networkAdapter = networkAdapter;
var networks = {
    eth: {
        nodeUrl: 'https://mainnet.infura.io/v3/faa4639b090f46499f29d894da0551a0',
        chainId: '1',
        chainType: types_1.ChainType.ETH
    },
    bsc: {
        nodeUrl: 'https://bsc-dataseed1.defibit.io',
        chainId: '1',
        chainType: types_1.ChainType.BSC
    },
    emit: {
        nodeUrl: 'https://node-core.emit.technology',
        chainId: '1',
        chainType: types_1.ChainType.EMIT
    },
    tron: {
        nodeUrl: 'https://api.trongrid.io/',
        chainId: '1',
        chainType: types_1.ChainType.TRON
    },
    sero: {
        nodeUrl: 'https://node-account.emit.technology',
        chainId: '1',
        chainType: types_1.ChainType.SERO
    },
};
//# sourceMappingURL=index.js.map