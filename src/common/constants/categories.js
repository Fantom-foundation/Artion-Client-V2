/**
 * Category object
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} icon Name of the icon from AppIconset
 * @property {string} label Translation code
 */

/**
 * @return {Category[]}
 */
export function CATEGORIES() {
    return [
        {
            id: 0,
            icon: 'rainbow',
            label: 'category.art',
        },
        {
            id: 1,
            icon: 'bear',
            label: 'category.collectibles',
        },
        {
            id: 2,
            icon: 'soccerball',
            label: 'category.sports',
        },
        {
            id: 3,
            icon: 'tools',
            label: 'category.utility',
        },
        {
            id: 4,
            icon: 'cardboard',
            label: 'category.trading_cards',
        },
        {
            id: 5,
            icon: 'monster',
            label: 'category.virtual_worlds',
        },
        {
            id: 6,
            icon: 'domain',
            label: 'category.domain_names',
        },
    ];
}
