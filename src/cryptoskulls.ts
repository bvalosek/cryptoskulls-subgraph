import { Address } from '@graphprotocol/graph-ts';
import { Transfer } from '../generated/CryptoSkullsDataSource/CryptoSkulls';
import { CryptoSkull } from '../generated/schema';
import { getOrCreateAccount, getOrCreateNft } from './entities';

export const ZERO_ADDRESS = Address.fromHexString('0x0000000000000000000000000000000000000000');

export function handleTransfer(event: Transfer): void {
  const to = event.params.to;
  const from = event.params.from
  const tokenId = event.params.tokenId;
  const timestamp = event.block.timestamp;
  const collectionAddress = event.address;
  const isMint = from.equals(ZERO_ADDRESS);

  const nft = getOrCreateNft(tokenId, collectionAddress, timestamp);
  const fromAccount = getOrCreateAccount(from, timestamp);
  const toAccount = getOrCreateAccount(to, timestamp);

  if (isMint) {
    const skull = new CryptoSkull(`${nft.id}-skull`);
    skull.bloodClaimed = false;
    nft.skull = skull.id;
    skull.save();
  }

  nft.owner = toAccount.id;
  nft.lastActivityAtTimestamp = timestamp;
  nft.save();

  fromAccount.lastActivityAtTimestamp = timestamp;
  fromAccount.skullCount -= 1;
  fromAccount.save();

  toAccount.lastActivityAtTimestamp = timestamp;
  toAccount.skullCount += 1;
  toAccount.save();
}
