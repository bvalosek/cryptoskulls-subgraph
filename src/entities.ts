import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Account, CryptoSkull, DemonicSkull } from '../generated/schema';

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
  const skullId = `cryptoskull-${tokenId}`;
  let skull = CryptoSkull.load(skullId);
  if (skull != null) return skull;

  skull = new CryptoSkull(skullId);
  skull.tokenId = tokenId;
  skull.transferCount = 0;
  skull.createdAtTimestamp = timestamp;
  skull.lastActivityAtTimestamp = timestamp;

  skull.save();
  return skull;
}

export const getOrCreateDemonicSkull = (tokenId: BigInt, timestamp: BigInt): DemonicSkull => {
  const skullId = `demonicskull-${tokenId}`;
  let skull = DemonicSkull.load(skullId);
  if (skull != null) return skull;

  skull = new DemonicSkull(skullId);
  skull.tokenId = tokenId;
  skull.transferCount = 0;
  skull.createdAtTimestamp = timestamp;
  skull.lastActivityAtTimestamp = timestamp;

  skull.save();
  return skull;
}
