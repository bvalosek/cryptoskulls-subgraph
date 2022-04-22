import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Account, Collection, NFT } from '../generated/schema';

export const getOrCreateAccount = (address: Address, timestamp: BigInt): Account => {
  const accountId = `account-${address.toHexString()}`;
  let account = Account.load(accountId);
  if (account != null) return account;

  account = new Account(accountId);
  account.address = address.toHexString();
  account.skullCount = 0;
  account.demonicSkullCount = 0;
  account.demonicBloodCount = 0;
  account.createdAtTimestamp = timestamp;
  account.lastActivityAtTimestamp = timestamp;

  account.save();
  return account;
}

export const getOrCreateCollection = (address: Address, timestamp: BigInt): Collection => {
  const collectionId = `collection-${address.toHexString()}`;
  let collection = Collection.load(collectionId);
  if (collection != null) return collection;

  collection = new Collection(collectionId);
  collection.address = address.toHexString();
  collection.createdAtTimestamp = timestamp;
  collection.lastActivityAtTimestamp = timestamp;

  collection.save();
  return collection;
}

export const getOrCreateNft = (tokenId: BigInt, collectionAddress: Address, timestamp: BigInt): NFT => {
  const collection = getOrCreateCollection(collectionAddress, timestamp);
  const nftId = `nft-${collection.id}-${tokenId}`;
  let nft = NFT.load(nftId);
  if (nft != null) return nft;

  nft = new NFT(nftId);
  nft.tokenId = tokenId;
  nft.collection = collection.id;
  nft.createdAtTimestamp = timestamp;
  nft.lastActivityAtTimestamp = timestamp;

  nft.save();
  return nft;
}
