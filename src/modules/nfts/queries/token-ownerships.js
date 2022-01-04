import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';
import dayjs from 'dayjs';

export async function getTokenOwnerships(contract = '', id = '', pagination = {}, sortByUpdated = false) {
    const query = {
        query: gql`
            query GetTokenOwnerships(
                $contract: Address!
                $tokenId: BigInt!
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                token(contract: $contract, tokenId: $tokenId) {
                    ownerships(first: $first, after: $after, last: $last, before: $before) {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            cursor
                            node {
                                contract
                                tokenId
                                owner
                                ownerUser {
                                    address
                                    username
                                    avatarThumb
                                }
                                qty
                                inEscrow
                                updated
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            contract,
            tokenId: toHex(id),
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    const data = await gqlQuery(query, 'token.ownerships');

    if (sortByUpdated && data && data.edges && data.edges.length > 1) {
        data.edges.sort(sortByUpdatedProp);
    }

    return data;
}

function sortByUpdatedProp(a, b) {
    return dayjs(b.node.updated).valueOf() - dayjs(a.node.updated).valueOf();
}
