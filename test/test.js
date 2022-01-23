const hre = require('hardhat');
const { getOwnerList } = require('../lib/nft-list');

describe('nifty-nfc-reader', () => {
  it('should pull the list of NFT owners', async () => {
    console.log(await getOwnerList());
  });
});
