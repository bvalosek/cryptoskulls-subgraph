import { ClaimSkullsCall, Transfer } from '../generated/DemonicSkullsDataSource/DemonicSkulls';
import { ZERO_ADDRESS } from './constants';
import { getOrCreateAccount, getOrCreateCryptoSkull, getOrCreateDemonicSkull } from './entities';

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

export function handleClaimSkullsCall(call: ClaimSkullsCall): void {
  const timestamp = call.block.timestamp;

  for (let i = 0; i < call.inputs.ids.length; i++) {
    const id = call.inputs.ids[i];
    const skull = getOrCreateCryptoSkull(id, timestamp);
    skull.demonizedAtTimestamp = timestamp;
    skull.lastActivityAtTimestamp = timestamp;
    skull.save();

    // TODO: can use the blood amount from the call to infer the level, and then
    // infer the ids of all claimed by either using same ids as claimed for L1, or
    // using levelTwoIndex / levelThreeIndex methods to figure out the last L2/L3
    // ID issued
  }
}
