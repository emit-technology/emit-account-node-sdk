# EMIT-BOX

### emit-box is a web3 provider for dapps ,that's develop base on emit-core . 

- [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102 "EIP-1102") : Opt-in account exposure

```javascript
    ethereum.send('eth_requestAccounts'): Promise<Array<string>>
```

**Legacy dapp initialization**

```
START dapp
IF web3 is defined
    CONTINUE dapp
IF web3 is undefined
    STOP dapp
```

**Example**
```
try {
    // Request account access if needed
    const accounts = await ethereum.send('eth_requestAccounts');
    // Accounts now exposed, use them
    ethereum.send('eth_sendTransaction', { from: accounts[0], /* ... */ })
} catch (error) {
    // User denied account access
}
```

- [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) : Ethereum Provider JavaScript API

**RequestArguments**

```
interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

Provider.request(args: RequestArguments): Promise<unknown>;
```

**RPC Errors**

```
interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
}


```

Status|code|description
---|---|---
4001|User Rejected Request|The user rejected the request.
4100|Unauthorized|The requested method and/or account has not been authorized by the user.
4200|Unsupported Method|The Provider does not support the requested method.
4900|Disconnected|The Provider is disconnected from all chains.
4901|Chain Disconnected|The Provider is not connected to the requested chain.
