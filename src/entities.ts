import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Account, CryptoSkull } from '../generated/schema';

export const getOrCreateAccount = (address: Address, timestamp: BigInt): Account => {
  const accountId = `account-${address.toHexString()}`;
  let account = Account.load(accountId);
  if (account != null) return account;

  account = new Account(accountId);
  account.address = address.toHexString();
  account.cryptoSkullCount = 0;
  account.demonicSkullCount = 0;
  account.demonicBloodCount = 0;
  account.createdAtTimestamp = timestamp;
  account.lastActivityAtTimestamp = timestamp;

  account.save();
  return account;
}

export const getOrCreateCryptoSkull = (tokenId: BigInt, timestamp: BigInt): CryptoSkull => {
  const nftId = `nft-cryptoskull-${tokenId}`;
  let skull = CryptoSkull.load(nftId);
  if (skull != null) return skull;

  skull = new CryptoSkull(nftId);
  skull.tokenId = tokenId;
  skull.transferCount = 0;
  skull.createdAtTimestamp = timestamp;
  skull.lastActivityAtTimestamp = timestamp;

  skull.save();
  return skull;
}
