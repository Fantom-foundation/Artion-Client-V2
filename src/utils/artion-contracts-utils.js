/**
 * createNFTCollection Creates a new ERC721 collection contract thru factory
 *
 * @param {string} nftName Name of the new NFT collection.
 * @param {string} nftSymbol Symbol of the new NFT collection.
 * @param {number|BN|string} amount Amount of FTM tokens in WEI units as platform fee.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function createNFTCollection(nftName, nftSymbol, amount, web3Client) {

    const abi = {
        "inputs": [
            {
            "internalType": "string",
            "name": "_name",
            "type": "string"
            },
            {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
            }
        ],
        "name": "createNFTContract",
        "outputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftName, nftSymbol])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_NFT_FACTORY_CONTRACT_ADDRESS,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}


/**
 * createNFT Mints a new token on given NFT collection contract
 *
 * @param {string} toAddress Address of the owner of newly created NFT
 * @param {string} tokenUri URI address of the NFT json object
 * @param {number|BN|string} amount Amount of FTM tokens in WEI units as platform fee.
 * @param {string} collectionAddress Address of the collection for new NFT.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function createNFT(toAddress, tokenUri, amount, collectionAddress, web3Client) {

    const abi = {
        "inputs": [
            {
            "internalType": "address",
            "name": "_to",
            "type": "address"
            },
            {
            "internalType": "string",
            "name": "_tokenUri",
            "type": "string"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[toAddress, tokenUri])

    // return tx object
    return {
        from: undefined,
        to: collectionAddress,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}

export default {
    createNFTCollection,
    createNFT
}