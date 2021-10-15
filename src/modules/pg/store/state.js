/**
 * PG state object
 * @typedef {Object} PgState
 * @property {boolean} showBidModal State of bidding modal visibility
 * @property {boolean} showSuccessModal State of success modal visibility
 */

/** @type {PgState} */
export const state = {
    showBidModal: false,
    showSuccessModal: false,
};

export const storeInLocalStorage = [];
