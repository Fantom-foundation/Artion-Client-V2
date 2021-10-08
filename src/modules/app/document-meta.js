/**
 * Helper functions for setting title and meta tags.
 */

import appConfig from '@/app.config.js';
import { setAttr } from 'fantom-vue-components/src/utils/DOM.js';

const APP_NAME = appConfig.name;
const APP_TITLE = appConfig.title;

/**
 * @param {string} title
 * @param {boolean} [addAppName]
 */
function setTitle(title, addAppName = false) {
    if (title !== undefined) {
        const t = addAppName ? `${title} | ${APP_NAME}` : title;

        document.title = t;
        setAttr(document.querySelector('meta[property="og:title"]'), 'content', t);
        setAttr(document.querySelector('meta[property="twitter:title"]'), 'content', t);
    }
}

/**
 * @param {string} description
 */
function setDescription(description) {
    if (description !== undefined) {
        setAttr(document.querySelector('meta[property="og:description"]'), 'content', description);
        setAttr(document.querySelector('meta[property="twitter:description"]'), 'content', description);
    }
}

/**
 * @param {string} title
 * @param {string} [description]
 */
export function setMetaInfo({ title = undefined, description = undefined }) {
    setTitle(title, title !== APP_TITLE);
    setDescription(description);
}
