// import needed libs
import Web3 from 'web3';
// ZERO_AMOUNT represents zero amount transferred on some calls.
const ZERO_AMOUNT = '0x0';
// OPERA_CHAIN_ID is the chain id used by Fantom Opera blockchain.
const OPERA_CHAIN_ID = '0xfa';
// TESTNET_CHAIN_ID is the chain id used by Fantom Opera test net.
const TESTNET_CHAIN_ID = '0xfa2';
/**
 * erc721Approve creates a transaction for setting ERC-721 token approval, which allows
 * approved party to transfer the specified NFT token of the approving owner.
 *
 * @param {string} erc721Address
 * @param {string} approveTo
 * @param {string|{BN}} tokenId
 * @return {{data: string, chainId: string, to: string, value: string}}
 */
function erc721Approve(erc721Address, approveTo, tokenId) {
    // create web3.js instance
    const web3 = new Web3();
    // make the transaction
    return {
        to: erc721Address,
        value: ZERO_AMOUNT,
        data: web3.eth.abi.encodeFunctionCall(
            {
                constant: false,
                inputs: [
                    {
                        name: '_to',
                        type: 'address',
                    },
                    {
                        name: '_tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'approve',
                outputs: [],
                payable: true,
                stateMutability: 'payable',
                type: 'function',
            },
            [approveTo, tokenId]
        ),
        chainId: OPERA_CHAIN_ID,
    };
}

// what we export here
export default {
    erc721Approve,
    OPERA_CHAIN_ID,
    TESTNET_CHAIN_ID,
};
