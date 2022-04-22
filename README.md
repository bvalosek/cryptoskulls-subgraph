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
NETWORK=rinkeby yarn prepare
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
NETWORK=rinkeby yarn deploy
```

## Example Queries

GraphQL endpoint: `https://api.thegraph.com/subgraphs/name/bvalosek/cryptoskulls-mainnet`

Get information about a specific CryptoSkull by token ID:

```graphql
```

Get all CryptoSkulls owned by an account:

```graphql
```

Get first 20 holders that still have at least one CryptoSkulls:

```graphql
```

Get all CryptoSkulls that haven't had their Demonic Blood claimed yet:

```graphql
```

Get the last 20 traded CryptoSkulls:

```graphql
```

Get a list of the top holders, sorted by CryptoSkull count:

```graphql
```

Get the newest 20 holders:

```graphql
```
