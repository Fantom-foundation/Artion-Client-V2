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
 function createArt(toAddress, tokenUri, supply, amount, collectionAddress, web3Client) {

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

/**
 * createOffer Method for offering item on marketplace
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} payToken Paying token address
 * @param {int} quantity Quantity of items
 * @param {number|BN|string} pricePerItem Price per item
 * @param {string} deadline Offer expiration
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function createOffer(nftAddress, tokenID, payToken, quantity, pricePerItem, deadline, web3Client) {

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
                "internalType": "contract IERC20",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_pricePerItem",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_deadline",
                "type": "uint256"
            }
        ],
        "name": "createOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, payToken, quantity, pricePerItem, deadline])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * cancelOffer Method for canceling item offer on marketplace
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function cancelOffer(nftAddress, tokenID, web3Client) {

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
            }
        ],
        "name": "cancelOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * acceptOffer Method for accepting item offer on marketplace
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} creator Offer creator address
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function acceptOffer(nftAddress, tokenID, creator, web3Client) {

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
                "internalType": "address",
                "name": "_creator",
                "type": "address"
            }
        ],
        "name": "acceptOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, creator])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * listItem Method for listing NFT on marketplace for sale
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {int} quantity Quantity of items (needed for ERC-1155 NFTs, set as 1 for ERC-721)
 * @param {string} payToken Paying token address
 * @param {number|BN|string} pricePerItem Price per item
 * @param {string} startingTime Scheduling for a future sale
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function listItem(nftAddress, tokenID, quantity, payToken, pricePerItem, startingTime, web3Client) {

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
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_pricePerItem",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_startingTime",
                "type": "uint256"
            }
        ],
        "name": "listItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, quantity, payToken, pricePerItem, startingTime])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * cancelListing Method for canceling listed NFT
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function cancelListing(nftAddress, tokenID, web3Client) {

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
            }
        ],
        "name": "cancelListing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * updateListing Method for updating listed NFT
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} payToken Paying token address
 * @param {number|BN|string} newPricePerItem Price per item
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function updateListing(nftAddress, tokenID, payToken, newPricePerItem, web3Client) {

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
                "internalType": "address",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_newPrice",
                "type": "uint256"
            }
        ],
        "name": "updateListing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, payToken, newPricePerItem])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * buyListedItem Method for buying listed NFT
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} ownerAddress Payable address of the owner
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function buyListedItem(nftAddress, tokenID, ownerAddress, web3Client) {

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
                "internalType": "address payable",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "buyItem",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, ownerAddress])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * buyListedItemWithPayToken Method for buying listed NFT
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} ownerAddress Payable address of the owner
 * @param {string} payToken Paying token address
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function buyListedItemWithPayToken(nftAddress, tokenID, ownerAddress, payToken, web3Client) {

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
                "internalType": "address",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "buyItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, payToken, ownerAddress])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * createAuction Creates a new auction for a given item
 *
 * Only the owner of item can create an auction and must have approved the contract
 * In addition to owning the item, the sender also has to have the MINTER role.
 * End time for the auction must be in the future.
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} payToken Paying token address
 * @param {number|BN|string} reservePrice Item cannot be sold for less than this price in wei
 * @param {string} startTimestamp Unix epoch in seconds for the auction start time
 * @param {string} endTimestamp Unix epoch in seconds for the auction end time
 * @param {bool} minBidReserve If set to true, then minimum bid is set to reserve price, otherwise nothing happens
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
 function createAuction(nftAddress, tokenID, payToken, reservePrice, startTimestamp, endTimestamp, minBidReserve, web3Client) {

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
                "internalType": "address",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_reservePrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_startTimestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "minBidReserve",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "_endTimestamp",
                "type": "uint256"
            }
        ],
        "name": "createAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, payToken, reservePrice, startTimestamp, minBidReserve, endTimestamp])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * placeAuctionBid Places a new bid, out bidding the existing bidder if found and criteria is reached
 *
 * Only callable when the auction is open
 * Bids from smart contracts are prohibited to prevent griefing with always reverting receiver
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT token ID
 * @param {number|BN|string} amount Amount of tokens in auction paytoken in WEI units
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 */
 function placeAuctionBid(nftAddress, tokenID, amount, web3Client) {

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
                "internalType": "uint256",
                "name": "_bidAmount",
                "type": "uint256"
            }
        ],
        "name": "placeBid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, amount])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * withdrawAuctionBid Allows the hightest bidder to withdraw the bid (after 12 hours post auction's end)
 *
 * Only callable by the existing top bidder
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 */
 function withdrawAuctionBid(nftAddress, tokenID, web3Client) {

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
            }
        ],
        "name": "withdrawBid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * resultAuction Closes a finished auction and rewards the highest bidder
 *
 * Only item owner
 * Auction can only be resulted if there has been a bidder and reserve met.
 * If there have been no bids, the auction needs to be cancelled instead using `cancelAuction()`
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 */
 function resultAuction(nftAddress, tokenID, web3Client) {

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
            }
        ],
        "name": "resultAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * cancelAuction Cancels an un-resulted auctions, returning the funds to the top bidder if found
 *
 * Only item owner
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 */
 function cancelAuction(nftAddress, tokenID, web3Client) {

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
            }
        ],
        "name": "cancelAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * updateAuctionReservePrice Update the current reserve price for an auction
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {number|BN|string} reservePrice New auction reserve price in WEI units
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 */
 function updateAuctionReservePrice(nftAddress, tokenID, reservePrice, web3Client) {

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
                "internalType": "uint256",
                "name": "_reservePrice",
                "type": "uint256"
            }
        ],
        "name": "updateAuctionReservePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, reservePrice])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * updateAuctionStartTime Update the current start time for an auction
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {int} startTime New start time (unix epoch in seconds)
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 */
 function updateAuctionStartTime(nftAddress, tokenID, startTime, web3Client) {

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
                "internalType": "uint256",
                "name": "_startTime",
                "type": "uint256"
            }
        ],
        "name": "updateAuctionStartTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, startTime])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * updateAuctionEndTime Update the current end time for an auction
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {int} endTime New end time (unix epoch in seconds)
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 */
 function updateAuctionEndTime(nftAddress, tokenID, endTime, web3Client) {

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
                "internalType": "uint256",
                "name": "_endTimestamp",
                "type": "uint256"
            }
        ],
        "name": "updateAuctionEndTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, endTime])

    // return tx object
    return {
        from: undefined,
        to: process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * randomPurchase Books a random NFT token on the given trade contract.
 *
 * @param {string} tradeAddress Address of the trading contract.
 * @param {string} payToken Address of the ERC20 token to pay in.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string}}
 */
function randomPurchase(tradeAddress, payToken, web3Client) {
    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "purchase",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    };

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[payToken]);

    // return tx object
    return {
        from: undefined,
        to: tradeAddress,
        data: encodedAbi,
    };
}

/**
 * artionERC721Burn Executes an NFT token burn on Artion Tradable contract.
 *
 * @param {string} nftContract Address of the ERC-721 Artion NFT contract.
 * @param {string} tokenID Identifier of the NFT token within the contract.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string}}
 */
function artionERC721Burn(nftContract, tokenID, web3Client) {

    const abi = {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    };

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[tokenID]);

    // return tx object
    return {
        from: undefined,
        to: nftContract,
        data: encodedAbi,
    };
}

/**
 * decodeMintedNftTokenId decodes tokenId of minted token from the transaction receipt.
 *
 * @param {TransactionReceipt} receipt The minting transaction receipt.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {string|null} The tokenId
 */
function decodeMintedNftTokenId(receipt, web3Client) {
    const mintedTopic = '0x997115af5924f5e38964c6d65c804d4cb85129b65e62eb20a8ca6329dbe57e18';
    const abiInputs = [
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "beneficiary",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "minter",
            "type": "address"
        }
    ];

    const log = receipt.logs.find(log => log.topics.includes(mintedTopic));
    if (!log) throw "Minted topic not present in the transaction log";
    const decoded = web3Client.eth.abi.decodeLog(abiInputs, log.data, log.topics.slice(1));
    console.log('decodedMinted', decoded);
    return decoded.tokenId;
}

export default {
    createNFTCollection,
    createNFT,
    createArtCollection,
    createArt,
    registerTokenRoyalty,
    listItem,
    cancelListing,
    updateListing,
    buyListedItem,
    buyListedItemWithPayToken,
    createOffer,
    cancelOffer,
    acceptOffer,
    createAuction,
    placeAuctionBid,
    withdrawAuctionBid,
    resultAuction,
    cancelAuction,
    updateAuctionReservePrice,
    updateAuctionStartTime,
    updateAuctionEndTime,
    randomPurchase,
    artionERC721Burn,
    decodeMintedNftTokenId,
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
