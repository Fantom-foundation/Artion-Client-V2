import dayjs from 'dayjs';

/**
 * @param {number|string|Date} date
 * @return {number}
 */
export function dateToUTCTimestamp(date) {
    const d = dayjs(date);

    return d.unix() + d.utcOffset() * 60;
}

/**
 * @param {*} date
 * @return {string}
 */
export function dateToDatetime(date) {
    return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

/**
 * Converts timestamp to date used in native date input element
 *
 * @param {number} timestamp Timestamp in seconds
 * @return {string}
 */
export function dateInFormatterTimestamp(timestamp) {
    return dayjs(timestamp).format('YYYY-MM-DD');
}

/**
 * Converts date from native date input element to timestamp
 *
 * @param {string} date Date in form 'YYYY-MM-DD'
 * @return {number}
 */
export function dateOutFormatterTimestamp(date) {
    return dayjs(date).valueOf();
}

/**
 * Converts timestamp to date+time used in native date input element
 *
 * @param {number} timestamp Timestamp in seconds
 * @return {string}
 */
export function datetimeInFormatterTimestamp(timestamp) {
    return dateToDatetime(timestamp);
}

/**
 * @param {*} date
 * @return {boolean}
 */
export function isExpired(date) {
    const now = dayjs();
    const deadline = dayjs(date);

    return deadline.diff(now) <= 0;
}
