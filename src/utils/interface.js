/**
 * @param {Object} wClass
 * @param {Array} intrface
 * @return {string[]} Not found methods
 */
export function implementsInterface(wClass, intrface) {
    const notFound = [];

    intrface.forEach(func => {
        if (typeof wClass.prototype[func] !== 'function') {
            notFound.push(func);
        }
    });

    return notFound;
}
