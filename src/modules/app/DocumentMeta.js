import { setAttr } from 'fantom-vue-components/src/utils/DOM.js';
import appConfig from '@/app.config.js';

class DocumentMeta {
    constructor() {
        this.APP_NAME = appConfig.name;
        this.APP_TITLE = appConfig.title;
        this.title = '';
        this.description = '';
    }

    /**
     * @param {string} title
     * @param {boolean} [addAppName]
     */
    setTitle(title, addAppName = false) {
        if (title !== undefined) {
            const t = addAppName ? `${title} | ${this.APP_NAME}` : title;

            document.title = t;
            setAttr(document.querySelector('meta[property="og:title"]'), 'content', t);
            setAttr(document.querySelector('meta[property="twitter:title"]'), 'content', t);

            this.title = t;
        }
    }

    /**
     * @param {string} description
     */
    setDescription(description) {
        if (description !== undefined) {
            setAttr(document.querySelector('meta[property="og:description"]'), 'content', description);
            setAttr(document.querySelector('meta[property="twitter:description"]'), 'content', description);

            this.description = description;
        }
    }

    /**
     * @param {string} title
     * @param {string} [description]
     */
    setMetaInfo({ title = undefined, description = undefined }) {
        this.setTitle(title, title !== this.APP_TITLE);
        this.setDescription(description);
    }

    /**
     * @return {string[]}
     */
    getSplittedTitle() {
        return this.title ? this.title.split('|').map(title => title.trim()) : [];
    }
}

export const documentMeta = new DocumentMeta();
