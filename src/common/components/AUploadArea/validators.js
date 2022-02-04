/**
 * @param {File} file
 * @return {boolean}
 */
export function imageValidator(file) {
    return file && file.type.indexOf('image/') > -1 && file.type !== 'image/svg+xml';
}
