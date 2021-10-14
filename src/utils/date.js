import dayjs from 'dayjs';

/**
 * @param {number|string|Date} date
 * @return {number}
 */
export function dateToUTCTimestamp(date) {
    const d = dayjs(date);

    return d.unix() + d.utcOffset() * 60;
}
