import { Transfer } from '../generated/DemonicSkullsDataSource/DemonicSkulls';
import { ZERO_ADDRESS } from './constants';
import { getOrCreateAccount, getOrCreateDemonicSkull } from './entities';

export function handleTransfer(event: Transfer): void {
  const to = event.params.to;
  const from = event.params.from
  const tokenId = event.params.tokenId;
  const timestamp = event.block.timestamp;
  const isMint = from.equals(ZERO_ADDRESS);

  const toAccount = getOrCreateAccount(to, timestamp);
  toAccount.lastActivityAtTimestamp = timestamp;
  toAccount.demonicSkullCount += 1;
  toAccount.save();

  const skull = getOrCreateDemonicSkull(tokenId, timestamp);
  skull.owner = toAccount.id;
  skull.lastActivityAtTimestamp = timestamp;

  if (!isMint) {
    const fromAccount = getOrCreateAccount(from, timestamp);
    fromAccount.lastActivityAtTimestamp = timestamp;
    fromAccount.demonicSkullCount -= 1;
    fromAccount.save();

    skull.transferCount += 1;
  }

  skull.save();
}
