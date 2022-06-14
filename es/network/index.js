import { ChainType } from '@emit-technology/emit-lib';
export function networkAdapter(network) {
    var networkObj = typeof network === 'string' ? Object.assign({}, networks[network]) : network;
    if (typeof networkObj !== 'object') {
        throw new Error("[EMIT] illegal 'network' parameter.");
    }
    if (!networkObj.nodeUrl) {
        throw new Error("[EMIT] 'nodeUrl' is required.");
    }
    return networkObj;
}
var networks = {
    eth: {
        nodeUrl: 'https://mainnet.infura.io/v3/faa4639b090f46499f29d894da0551a0',
        chainId: '1',
        chainType: ChainType.ETH
    },
    bsc: {
        nodeUrl: 'https://bsc-dataseed1.defibit.io',
        chainId: '1',
        chainType: ChainType.BSC
    },
    emit: {
        nodeUrl: 'https://node-core.emit.technology',
        chainId: '1',
        chainType: ChainType.EMIT
    },
    tron: {
        nodeUrl: 'https://api.trongrid.io/',
        chainId: '1',
        chainType: ChainType.TRON
    },
    sero: {
        nodeUrl: 'https://node-account.emit.technology',
        chainId: '1',
        chainType: ChainType.SERO
    },
};
//# sourceMappingURL=index.js.map