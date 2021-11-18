import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getNotificationSettings() {
    const query = {
        query: gql`
            query GetNotificationSettings {
                notificationSettings {
                    sNotification
                    sBundleBuy
                    sBundleSell
                    sBundleOffer
                    sBundleOfferCancel
                    sNftAuctionPrice
                    sNftBidToAuction
                    sNftBidToAuctionCancel
                    sAuctionWin
                    sAuctionOfBidCancel
                    sNftSell
                    sNftBuy
                    sNftOffer
                    sNftOfferCancel
                    fNotification
                    fBundleCreation
                    fBundleList
                    fBundlePrice
                    fNftAuctionPrice
                    fNftList
                    fNftAuction
                    fNftPrice
                }
            }
        `,
        // variables: {},
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'notificationSettings');
}
