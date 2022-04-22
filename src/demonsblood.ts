import { Address, BigInt } from '@graphprotocol/graph-ts';
import { TransferSingle, TransferBatch } from '../generated/DemonsBloodDataSource/DemonsBlood'
import { ZERO_ADDRESS } from './constants';
import { getOrCreateAccount } from './entities';

export function handleTransferSingle(event: TransferSingle): void {
  if (!event.params.id.isZero()) {
    // demonic blood = token id 0
    return;
  }

  processTransfer(
    event.params.to,
    event.params.from,
    event.params.value,
    event.block.timestamp);
}

export function handleTransferBatch(event: TransferBatch): void {
  for (let i = 0; i < event.params.ids.length; i++) {
    if (!event.params.ids[i].isZero()) {
      // demonic blood = token id 0
      continue;
    }
    processTransfer(
      event.params.to,
      event.params.from,
      event.params.values[i],
      event.block.timestamp);
  }
}

const processTransfer = (to: Address, from: Address, value: BigInt, timestamp: BigInt): void => {
  const count = value.toI32();
  const isMint = from.equals(ZERO_ADDRESS);
  const isBurn = to.equals(ZERO_ADDRESS);

  if (!isBurn) {
    const toAccount = getOrCreateAccount(to, timestamp);
    toAccount.lastActivityAtTimestamp = timestamp;
    toAccount.demonicBloodCount += count;
    toAccount.save();
  }

  if (!isMint) {
    const fromAccount = getOrCreateAccount(from, timestamp);
    fromAccount.lastActivityAtTimestamp = timestamp;
    fromAccount.demonicBloodCount -= count
    fromAccount.save();
  }
}
