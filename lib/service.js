'use strict';

const EventEmitter = require('events');

const { Payload } = require('./payload');
const { ethers } = require('ethers');
const { getOwnerList } = require('./nft-list');
const verify = require('./verify');

class NFCService extends EventEmitter {
  startListeningNFC() {
    throw Error('not implemented');
    // override to do logic to emit payload events from serial comms
  }
  toObject(payload) {
    const decoded = Payload.decode(message).finish();
    decoded.signature = ethers.utils.hexlify(decoded.signature);
    decoded.tokenId = decoded.tokenId.toNumber();
    decoded.nonce = decoded.nonce.toNumber();
  }
  onVerified(user) {
    throw Error('not implemented');
    // unlock the door
  }
  onMessage(message) {
    (async () => {
      try {
        const decoded = this.toObject(message);
        const user = verify.recoverAddress(decoded);
	const list = await getOwnerList();
        if ((list[decoded.tokenId] || '').toLowerCase() === user.toLowerCase()) return await this.onVerified(user);
        await this.onFailure(user);
      } catch (e) {
        this.emit('error', e);
      }
    })().catch((err) => { /* should never be called */ });
  }
}
