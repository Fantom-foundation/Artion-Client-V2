import { bFromTokenValue } from '@/utils/big-number.js';
import { i18n } from '@/plugins/vue-i18n.js';

export const localeOptions = {
    currLocale: 'en-US',
    currency: 'USD',
    fractionDigits: 0,
    tokenPrice: 0,
};

/**
 * @param {number} _number
 * @param {number} [_fractionDigits]
 * @param {string} [_currency]
 * @param {boolean} [_variableFDigits]
 * @return {*}
 */
export function formatNumberByLocale(
    _number,
    _fractionDigits = localeOptions.fractionDigits,
    _currency,
    _variableFDigits
) {
    let options = {
        minimumFractionDigits: _variableFDigits ? 0 : _fractionDigits,
        maximumFractionDigits: _fractionDigits,
    };

    if (_currency) {
        options.style = 'currency';
        options.currency = _currency;
    }

    return new Intl.NumberFormat(localeOptions.currLocale, options).format(_number);
}

export function formatTokenValue(value, tokenPriceDecimals = 18, _fractionDigits, _currency) {
    return formatNumberByLocale(
        bFromTokenValue(value, tokenPriceDecimals).toNumber(),
        _fractionDigits,
        _currency ? localeOptions.currency : ''
    );
}

/**
 * @param {string|number} value
 * @return {VueI18n.DateTimeFormatResult|null}
 */
export function dateFormatter(value) {
    return value ? i18n.d(new Date(value), 'short') : null;
}

/**
 * @param {string|number} value
 * @return {VueI18n.DateTimeFormatResult|null}
 */
export function datetimeFormatter(value) {
    return value ? i18n.d(new Date(value), 'shortDatetime') : null;
}
