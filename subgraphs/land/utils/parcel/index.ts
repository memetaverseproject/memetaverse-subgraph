import { BigInt } from "@graphprotocol/graph-ts"
import { NFT, Parcel } from "../../generated/schema"
import { toLowerCase } from "../string"

export let WIDTH = BigInt.fromI32(300)
export let HEIGHT = BigInt.fromI32(300)

export function buildParcelFromNFT(nft: NFT): Parcel {
    let parcel = new Parcel(nft.id)
    let coordinates = decodeTokenId(nft.tokenId)

    parcel.x = coordinates[0]
    parcel.y = coordinates[1]
    parcel.tokenId = nft.tokenId
    parcel.owner = nft.owner
    return parcel
}

export function decodeTokenId(tokenId: BigInt): BigInt[] {
    let x = tokenId.mod(WIDTH)
    let y = tokenId.div(HEIGHT)
    return [x, y]
}

export function getParcelText(parcel: Parcel, name: string): string {
    let text = parcel.x.toString() + ',' + parcel.y.toString()
    if (name != '') {
        text += ',' + toLowerCase(name)
    }
    return text
}


export function getParcelImage(parcel: Parcel): string {
    return (
        'https://testnet-api.memetaverse.club/v1/parcels/' +
        parcel.x.toString() +
        '/' +
        parcel.y.toString() +
        '/map.png'
    )
}

export function isInBounds(x: BigInt, y: BigInt): boolean {
    let lowerBound = BigInt.fromI32(-150)
    let upperBound = BigInt.fromI32(150)
    return (
        x.ge(lowerBound) && x.le(upperBound) && y.ge(lowerBound) && y.le(upperBound)
    )
}

export function getDistanceToPlaza(parcel: Parcel): i32 {
    return -1
}

export function getAdjacentToRoad(parcel: Parcel): boolean {
    return false
}
