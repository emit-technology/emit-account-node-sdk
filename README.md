# emit-account-node-sdk

### emit-account-node-sdkis a web3 provider for dapps ,that's develop base on emit-core . 

#### 1. Install SDK and Web3
```javascript
npm i @emit-technology/emit-account-node-sdk
npm i web3@npm:@emit-technology/web3
npm i web3@npm:@emit-technology/web3-core-helpers
npm i web3@npm:@emit-technology/web3-utils
```

#### 2. Import and initialize a web3 instance
```javascript
import EmitBox from '@emit-technology/emit-account-node-sdk';
import Web3 from 'web3';

enum ChainType { _, SERO, ETH, TRON, BSC, EMIT }

const emitBox  = new EmitBox({
    name: "TESTDEMO",
    url: "http://localhost:3000",
    category: "web3",
    contractAddress: ""
}, {
    nodeUrl: "https://mainnet.infura.io/v3/faa4639b090f46499f29d894da0551a0",
    chainType: ChainType.ETH,
    chainId: "1"
});
const web3 = new Web3(emitBox.provider);
```

#### 3.Verify everything works by calling a web3 method such as getAccounts:
```javascript
web3.eth.getAccounts((err,result)=>{
    console.log(err,result)
})
```
or
```javascript
web3.eth.getAccounts().then(data=>{
    console.log("data:",data);
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
