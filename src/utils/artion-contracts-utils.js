// ZERO_AMOUNT represents zero amount transferred on some calls.
const ZERO_AMOUNT = '0x0';

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

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(createNFTContractAbi,[nftName, nftSymbol])

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


/**
 * createArtCollection Creates a new ERC1155 collection contract thru factory
 *
 * @param {string} nftName Name of the new NFT collection.
 * @param {string} nftSymbol Symbol of the new NFT collection.
 * @param {number|BN|string} amount Amount of FTM tokens in WEI units as platform fee.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function createArtCollection(nftName, nftSymbol, amount, web3Client) {

    // encode contract ABI with parameters
    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(createNFTContractAbi,[nftName, nftSymbol])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_ART_FACTORY_CONTRACT_ADDRESS,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}


/**
 * createArt Mints a new token on given ERC1155 collection contract
 * and assigns supply to an address
 * 
 * @param {string} toAddress Address of the owner of newly created NFT
 * @param {string} tokenUri URI address of the NFT json object
 * @param {number|BN|string} supply Amount of tokens to supply the first owner
 * @param {number|BN|string} amount Amount of FTM tokens in WEI units as platform fee.
 * @param {string} collectionAddress Address of the collection for new NFT.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function createArt(toAddress, tokenUri, amount, collectionAddress, web3Client) {

    const abi = {
        "inputs": [
            {
            "internalType": "address",
            "name": "_to",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "_supply",
            "type": "uint256"
            },
            {
            "internalType": "string",
            "name": "_uri",
            "type": "string"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[toAddress, supply, tokenUri])

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

/**
 * registerTokenRoyalty Method for setting royalty of NFT token
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {int} royalty Royalty which is paid to minter of NFT token
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function registerTokenRoyalty(nftAddress, tokenID, royalty, web3Client) {

    const abi = {
        "inputs": [
            {
            "internalType": "address",
            "name": "_nftAddress",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
            },
            {
            "internalType": "uint16",
            "name": "_royalty",
            "type": "uint16"
            }
        ],
        "name": "registerRoyalty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, royalty])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

export default {
    createNFTCollection,
    createNFT,
    createArtCollection,
    createArt,
    registerTokenRoyalty
}

const createNFTContractAbi = {
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