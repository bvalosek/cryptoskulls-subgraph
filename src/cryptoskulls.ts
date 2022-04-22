import { Address } from '@graphprotocol/graph-ts';
import { Transfer } from '../generated/CryptoSkullsDataSource/CryptoSkulls';
import { getOrCreateAccount, getOrCreateCryptoSkull } from './entities';

export const ZERO_ADDRESS = Address.fromHexString('0x0000000000000000000000000000000000000000');

export function handleTransfer(event: Transfer): void {
  const to = event.params.to;
  const from = event.params.from
  const tokenId = event.params.tokenId;
  const timestamp = event.block.timestamp;
  const isMint = from.equals(ZERO_ADDRESS);

  const nft = getOrCreateCryptoSkull(tokenId, timestamp);
  const fromAccount = getOrCreateAccount(from, timestamp);
  const toAccount = getOrCreateAccount(to, timestamp);

  if (!isMint) {
    nft.transferCount += 1;
  }

  nft.owner = toAccount.id;
  nft.lastActivityAtTimestamp = timestamp;
  nft.save();

  fromAccount.lastActivityAtTimestamp = timestamp;
  fromAccount.cryptoSkullCount -= 1;
  fromAccount.save();

  toAccount.lastActivityAtTimestamp = timestamp;
  toAccount.cryptoSkullCount += 1;
  toAccount.save();
}
