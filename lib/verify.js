const { EIP712TypedData } = require('@0x/types');
const { signTypedDataUtils } = require('@0x/utils');

const EIP712_TYPES = exports.EIP712_TYPES = {
	EIP712Domain: [
		{
			name: 'name',
			type: 'string',
		},
		{
			name: 'version',
			type: 'string',
		},
		{
			name: 'chainId',
			type: 'uint256',
		},
		{
			name: 'verifyingContract',
			type: 'address',
		},
	],
	NiftyDoorChallenge: [
		{
			name: 'tokenId',
			type: 'uint256',
		},
		{
			name: 'nonce',
			type: 'uint256',
		}
	],
};
const toEIP712 = exports.toEIP712 = (message) => {
  const contractAddress = process.env.NFT_ADDRESS || '0x63f8F23ce0f3648097447622209E95A391c44b00'; // just use ATXDAONFT
  const chainId = '1';
  return {
    types: EIP712_TYPES,
    domain: {
      name: 'NiftyDoor',
      version: '1',
      chainId: chainId,
      verifyingContract
    },
    message,
    primaryType: 'NiftyDoor'
  };
};

const toEIP712Digest = exports.toEIP712Digest = (message) => {
  return signTypedDataUtils.generateTypedDataHash(exports.toEIP712(message));
};

const recoverAddress = exports.recoverAddress = (payload) => {
   const o = { ...payload };
   const { signature } = o;
   delete o.signature;
   return ethers.utils.recoverAddress(exports.toEIP712Digest(o), signature);
};
