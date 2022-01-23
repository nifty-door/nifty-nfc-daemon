'use strict';

const { ethers } = require('ethers');
const { zipObject } = require('lodash');
const globalObject = require('the-global-object');
const NFTIteratorArtifact = require('../artifacts/contracts/NFTIterator.sol/NFTIterator');

const signer = (
  (globalObject.ethereum && new ethers.providers.Web3Provider(globalObject.ethereum)) ||
  new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URI || 'https://mainnet.infura.io/v3/816df2901a454b18b7df259e61f92cd2'
  )
).getSigner();
const factory = new ethers.ContractFactory(
  NFTIteratorArtifact.abi,
  NFTIteratorArtifact.bytecode,
  signer
);

const nft = process.env.NFT_ADDRESS || '0x63f8F23ce0f3648097447622209E95A391c44b00'; // just use ATXDAONFT

exports.getOwnerList = async () => {
  const [list] = ethers.utils.defaultAbiCoder.decode(
    ['address[]'],
    await signer.provider.call({
      data: factory.getDeployTransaction(nft).data
    })
  );
  const owners = zipObject(
    Array(199)
      .fill(0)
      .map((_, i) => i + 1),
    list
  );
  Object.keys(owners).forEach((key) => {
    if (owners[key] === ethers.constants.AddressZero) {
      delete owners[key];
    }
  });
  return owners;
};
