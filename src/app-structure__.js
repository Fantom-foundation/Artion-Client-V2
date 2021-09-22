import { findNodeBy, isParent, walkTree } from 'fantom-vue-components/src/utils/simple-tree.js';
import { clone } from 'fantom-vue-components/src/utils';
// import appConfig from '@/app.config';

/**
 * Application structure object.
 * @typedef {Object} AppStructureNode
 * @property {string} id Unique node id
 * @property {FAccordionNavigationNode} menu
 * @property {AppStructureNode[]} _c Children
 */

/**
 * Application structure used for navigation and view transitions.
 *
 * @type {AppStructureNode[]}
 */
let appStructure = null;

function getAppStructure() {
    return [];
}

/**
 * Extract data for navigation from application structure tree.
 * If `menu` object is defined on the node, properties `route` and `label` from app node
 * will be copied to menu node as defaults.
 *
 * @returns {FAccordionNavigationNode[]}
 */
export function getMenuTree() {
    const parents = [];
    const menu = [];
    let level = 0;
    let ptr = {
        _c: menu,
    };
    if (!appStructure) {
        appStructure = getAppStructure();
    }

    walkTree(appStructure, (_node, _parent, _level) => {
        let node = null;

        if (level > _level) {
            while (level > _level) {
                ptr = parents.pop();
                level--;
            }
        }

        node = {
            id: _node.route,
            route: _node.route,
            label: _node.label,
            dontRender: !_node.menu,
            ...clone(_node.menu),
        };

        // remove `route` key if `node` is a parent node and contains another menu node
        if (_node._c && _node._c.length > 0 && !!_node._c.find(_child => !!_child.menu)) {
            delete node.route;
        }

        if (!ptr._c) {
            ptr._c = [];
        }

        ptr._c.push(node);

        if (isParent(_node)) {
            parents.push(ptr);
            ptr = node;
        }

        level = _level;

        return node ? '' : 'skip';
    });

    return menu;
}

/**
 * @param {string} _route
 * @returns {AppStructureNode}
 */
export function getAppNode(_route) {
    if (!appStructure) {
        appStructure = getAppStructure();
    }

    const node = findNodeBy(appStructure, _route, 'route');

    return node.node;
}

/**
 * @param {string} _route
 * @returns {AppStructureNode[]}
 */
export function getAppNodeParents(_route) {
    if (!appStructure) {
        appStructure = getAppStructure();
    }

    const node = findNodeBy(appStructure, _route, 'route');

    return node.parents;
}

/**
 * @param {string} _route
 * @returns {string}
 */
export function getAppNodeLabel(_route) {
    const node = getAppNode(_route);

    return node?.label || '';
}

/**
 * @param {string} _route
 * @returns {AppStructureNode|null}
 */
export function getAppNodeParent(_route) {
    const parents = getAppNodeParents(_route);

    return parents[parents.length - 1] || null;
}
