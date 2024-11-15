import { ethereum } from "@graphprotocol/graph-ts";

export function getEstateHistoryId(event: ethereum.Event, type: string, id: string): string {
  return event.block.number.toString() + "-" + event.logIndex.toString() + "-" + type + "-" + id;
}
