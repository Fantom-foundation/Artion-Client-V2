import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

let CONTRACTS = {
    marketplace: '',
    auctionHall: '',
};

let contractsLoaded = false;

// TEMPORARY!
/*
async function fetchContracts() {
    return {
        marketplace: '0xa06aecbb8CD9328667f8E05f288e5b3ac1CFf852',
        auctionHall: '0x951Cc69504d39b3eDb155CA99f555E47E044c2F1',
    };
}
*/

async function fetchContracts() {
    const query = {
        query: gql`
            query GetContracts {
                contracts {
                    marketplace
                    auctionHall
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'contracts');
}

export async function getContractAddress(code) {
    if (!contractsLoaded) {
        try {
            CONTRACTS = await fetchContracts();
            contractsLoaded = true;
        } catch (error) {
            console.error(error);
        }
    }

    if (!CONTRACTS[code]) {
        throw new Error(`Can't find contract '${code}'`);
    }

    return CONTRACTS[code];
}
