import { Transfer } from '../generated/CryptoSkullsDataSource/CryptoSkulls';
import { ZERO_ADDRESS } from './constants';
import { getOrCreateAccount, getOrCreateCryptoSkull } from './entities';

export function handleTransfer(event: Transfer): void {
  const to = event.params.to;
  const from = event.params.from
  const tokenId = event.params.tokenId;
  const timestamp = event.block.timestamp;
  const isMint = from.equals(ZERO_ADDRESS);

  const toAccount = getOrCreateAccount(to, timestamp);
  toAccount.lastActivityAtTimestamp = timestamp;
  toAccount.cryptoSkullCount += 1;
  toAccount.save();

  const skull = getOrCreateCryptoSkull(tokenId, timestamp);
  skull.owner = toAccount.id;
  skull.lastActivityAtTimestamp = timestamp;

  if (!isMint) {
    const fromAccount = getOrCreateAccount(from, timestamp);
    fromAccount.lastActivityAtTimestamp = timestamp;
    fromAccount.cryptoSkullCount -= 1;
    fromAccount.save();

    skull.transferCount += 1;
  }

  skull.save();
}
