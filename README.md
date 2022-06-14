# emit-account-node-sdk

### emit-account-node-sdkis a web3 provider for dapps ,that's develop base on emit-core . 

#### 1. Install SDK and Web3
```javascript
npm i @emit-technology/emit-account-node-sdk
npm i web3@npm:@emit-technology/web3
npm i web3-core-helpers@npm:@emit-technology/web3-core-helpers
npm i web3-utils@npm:@emit-technology/web3-utils
```

#### 2. Import and initialize a web3 instance
```javascript
import {AccountModel,ChainType} from '@emit-technology/emit-lib';
import EmitBox from '@emit-technology/emit-account-node-sdk';
import Web3 from 'web3';

const dapp = {
     name: "DEMO",
     url: "http://localhost:3000",
     category: "web3",
     contractAddress: ""
 }
const network_emit = {nodeUrl: "https://node-emit-dev.bangs.network", chainId: "667", chainType: ChainType.EMIT}
const network_bsc = {nodeUrl: "https://node-bsc.bangs.network", chainId: "1", chainType: ChainType.BSC}
const network_eth = {nodeUrl: "https://node-bsc.bangs.network", chainId: "1", chainType: ChainType.ETH}

const emitBox = new EmitBox(dapp, network_emit);
const ethProvider = emitBox.newProvider({
    dapp: dapp,
    network: network_eth,
    version: "1.0"
});
const bscProvider = emitBox.newProvider({
    dapp: dapp,
    network: network_bsc,
    version: "1.0"
})


//if you single use ethereum network
const web3 = new Web3(ethProvider);
 
//if you are using multi-chain , and use web3[ChainType.ETH] instead of web3, eg: web3[ChainType.ETH].eth.getAccounts 
/** 
const web3 = {
    [ChainType.ETH]: new Web3(ethProvider),
    [ChainType.BSC]: new Web3(bscProvider)
}
*/

```

#### 3.Verify everything works by calling a web3 method such as getAccounts:
```javascript
web3.eth.getAccounts((err,accounts)=>{
    console.log(err,accounts[0])
})
```
or
```javascript
web3.eth.getAccounts().then(accounts=>{
    console.log("accounts:",accounts[0]);
}).catch(e=>{
    console.error("error",e)
})
```
or
```javascript
emitBox.requestAccount().then((account:AccountModel)=>{
    console.log("account:",account);
}).catch(e=>{
    console.error("error",e)
})
```

#### 4 sign Method 

```javascript
web3.eth.personal.sign("TEST DATA",account,"").then(value => {
   console.log(value); 
})

web3.eth.personal.ecRecover("TEST DATA",signature).then(value => {
    console.log(value); 
})
```
or
```javascript
//Batch sign
emitBox.batchSignMsg([{
    chain: ChainType.EMIT,
    msg: "TEST"
}]).then((data:any)=>console.log(data))

```

### 5 Send transaction

web3 chain

```javascript

    getNonce = async (): Promise<any> => {
        const from = ""//account address
        return new Promise((resolve, reject) => {
            web3.eth.getTransactionCount(from, "pending", (error, nonce) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(nonce)
                }
            })
        })
    }

    getGasPrice = async (): Promise<string> => {
        const gasPrice = await web3.eth.getGasPrice()
        return gasPrice;
    }

    estimateGas = async (txParams: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            web3.eth.estimateGas(txParams, (err, ret) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(ret);
                }
            })
        })
    }

async function send {
    const txConfig = {
        from: from,
        to: receive,
        value: data ? "0x0" : utils.toHex(utils.toValue(amount, decimal)),
        nonce: await this.getNonce(),
        data: data,
        // common: config.chains[chain].common
/**
for dev env
{
            baseChain: "mainnet",
            customer: {
                name: "mainnet",
                networkId: 15,
                chainId: 1337,
            },
            hardfork: "petersburg"
        },
**/

    }
    txConfig["gas"] = await this.estimateGas(txConfig);
    const result = await web3.eth.sendTransaction(txConfig)
}





```

emit core

```javascript
async function send {

const prepareBlock = await emitBoxSdk.emitBox.emitDataNode.genPrepareBlock(
    from,
    data,
    {
        settles: [],
        outs: [
            {
                target: receive,
                factor: {
                    category: utils.token2Category(token),
                    value: utils.toValueHex(amount),
                },
            },
        ],
    },
    undefined
);
await emitBoxSdk.emitBox.emitDataNode.prepareBlock(prepareBlock);

}
```
