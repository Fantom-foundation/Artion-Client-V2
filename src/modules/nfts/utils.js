import dayjs from 'dayjs';

/**
 * @param {Object} auction
 * @return {boolean}
 */
export function auctionIsClosed(auction) {
    const closeTime = dayjs(auction.closed);
    const endTime = dayjs(auction.endTime);

    if (!isNaN(closeTime.valueOf())) {
        return true;
    }

    return endTime.valueOf() < Date.now();
}
