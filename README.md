# cryptoskulls-subgraph

Unofficial subgraph for CryptoSkulls.

[The Graph](https://thegraph.com/en/) is a hosted indexing protocol for blockchain events and data.

This subgraph creates a queryable GraphQL endpoint that can be used to easily query live data in the CryptoSkulls ecosystem.

See **Example Queries** below for GraphQL queries that can be used in the [Hosted Playground](https://thegraph.com/hosted-service/subgraph/bvalosek/cryptoskulls-mainnet), or in a web application via HTTPS requests.

## Development

Install dependencies:

```
yarn
```

Prepare the manifest for a specific network (see `./config`):

```
NETWORK=mainnet yarn prepare
```

Generate AssemblyScript bindings from ABIs and graph schema (this does not need
to be re-run for different networks, but prepare must be run at least once for
the bindings to generate):

```
yarn codegen
```

Ensure you have authorized with the graph-cli:

```
npx graph auth --product hosted-service $YOUR_AUTH_TOKEN
```

Deploy the subgraph to the prepared network:

```
NETWORK=mainnet yarn deploy
```

## Example Queries

GraphQL endpoint: `https://api.thegraph.com/subgraphs/name/bvalosek/cryptoskulls-mainnet`

GraphQL is extremely flexible, the below examples are just a starting point. Creative use of TheGraph's built in filters, sorting, and node relationships can enable complex queries.

See [TheGraph's GraphQL API reference](https://thegraph.com/docs/en/developer/graphql-api/) for more info.

### Queries

Get information about a specific CryptoSkull by token ID:

```graphql
{
  cryptoSkull(id: "cryptoskull-1423") {
    tokenId
    owner { address cryptoSkullCount }
    transferCount
    bloodClaimedAtTimestamp
    demonizedAtTimestamp
    createdAtTimestamp
    lastActivityAtTimestamp
  }
}
```

Get all CryptoSkulls owned by an account:

```graphql
{
  account(id: "account-0x303eefedee1ba8e5d507a55465d946b2fea18583") {
    address
    cryptoSkullCount
    demonicSkullCount
    demonicBloodCount
    ownedCryptoSkulls { tokenId }
    ownedDemonicSkulls { tokenId }
    createdAtTimestamp
    lastActivityAtTimestamp
  }
}
```

Get first 20 holders that still have at least one CryptoSkulls:

```graphql
{
  accounts(
    where: {cryptoSkullCount_gt: 0}
    orderBy: createdAtTimestamp
    orderDirection: asc
    first: 20
  ) {
    address
    cryptoSkullCount
    ownedCryptoSkulls { tokenId }
    createdAtTimestamp
    lastActivityAtTimestamp
  }
}
```

Get all CryptoSkulls that haven't had their Demonic Blood claimed yet:

```graphql
{
  cryptoSkulls(
    where: {bloodClaimedAtTimestamp: null}
    orderBy: tokenId
    orderDirection: asc
    first: 1000
  ) {
    tokenId
    owner {
      address
      lastActivityAtTimestamp
    }
    lastActivityAtTimestamp
  }
}
```

Get the last 20 traded CryptoSkulls:

```graphql
{
  cryptoSkulls(
    where: {bloodClaimedAtTimestamp: null}
    orderBy: lastActivityAtTimestamp
    orderDirection: desc
    first: 20
  ) {
    tokenId
    demonizedAtTimestamp
    bloodClaimedAtTimestamp
    owner {
      address
      cryptoSkullCount
    }
    transferCount
    lastActivityAtTimestamp
  }
}
```

Get a list of the top 50 holders, sorted by CryptoSkull count:

```graphql
{
  accounts(orderBy: cryptoSkullCount, orderDirection: desc, first: 50) {
    address
    cryptoSkullCount
    demonicBloodCount
    demonicSkullCount
    createdAtTimestamp
    lastActivityAtTimestamp
    ownedCryptoSkulls(
      first: 5
      orderBy: lastActivityAtTimestamp
      orderDirection: desc
    ) {
      tokenId
      lastActivityAtTimestamp
    }
  }
}
```

Get the newest 20 holders:

```graphql
{
  accounts(orderBy: createdAtTimestamp, orderDirection: desc, first: 20) {
    address
    cryptoSkullCount
    demonicBloodCount
    demonicSkullCount
    createdAtTimestamp
    lastActivityAtTimestamp
    ownedCryptoSkulls(
      first: 5
      orderBy: lastActivityAtTimestamp
      orderDirection: desc
    ) {
      tokenId
      lastActivityAtTimestamp
    }
  }
}
```
