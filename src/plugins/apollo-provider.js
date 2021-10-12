import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// New Imports
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { onError } from 'apollo-link-error';

import VueApollo from 'vue-apollo';

import appConfig from '@/app.config.js';
import { shuffle } from 'fantom-vue-components/src/utils/array.js';
import FNetworkStatus from 'fantom-vue-components/src/components/FNetworkStatus/FNetworkStatus.vue';
import { setContext } from 'apollo-link-context';
import { getBearerToken } from '@/modules/account/auth.js';

/**
 * Create an array of shuffled http providers excluding default provider.
 *
 * @param {Array} _providers
 * @param {String} _defaultHttpProvider
 * @return {Array}
 */
function setHttpApolloProviders(_providers, _defaultHttpProvider) {
    const providers = _providers.map(_item => _item.http).filter(_value => _value !== _defaultHttpProvider);

    shuffle(providers);

    return providers;
}

const apolloProviders = appConfig.apollo.providers;
// const maxRetryLinkAttempts = apolloProviders.length;
const maxRetryLinkAttempts = Infinity;
let defaultProviderIndex = appConfig.apollo.defaultProviderIndex;
let netError = false;

if (defaultProviderIndex === 'random') {
    defaultProviderIndex = Math.floor(Math.random() * apolloProviders.length);
}

const defaultHttpProvider = apolloProviders[defaultProviderIndex].http;
let httpProvider = defaultHttpProvider;
let httpApolloProviders = setHttpApolloProviders(apolloProviders, defaultHttpProvider);
let lastOperationName = '';

function resetHttpApolloProviders() {
    httpApolloProviders = setHttpApolloProviders(apolloProviders, defaultHttpProvider);
    lastOperationName = '';
}

const httpLink = new HttpLink({
    uri: httpProvider,
});

export function getCurrentHttpProvider() {
    return httpProvider;
}

/*
const loggerLink = new ApolloLink((operation, forward) => {
    console.log(`GraphQL Request: ${operation.operationName}`);
    operation.setContext({ start: new Date() });
    return forward(operation).map((response) => {
        const responseTime = new Date() - operation.getContext().start;
        console.log(`GraphQL Response ${operation.operationName} took: ${responseTime}ms`);
        return response;
    });
});
*/

const netErrorLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        if (netError) {
            netError = false;
            FNetworkStatus.online();
        }

        return response;
    });
});

const httpAuthLink = setContext((operation, { headers }) => {
    const token = getBearerToken();

    const h = { ...headers };

    if (token) {
        h.authorization = 'Bearer ' + token;
    } else if ('authorization' in h) {
        delete h.authorization;
    }

    return {
        headers: h,
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    if (networkError) {
        console.log(`[Network error]: ${networkError}`, networkError);

        if (!netError) {
            netError = true;

            // run "offline" a little later, because it can only be switching providers
            setTimeout(function() {
                if (netError) {
                    FNetworkStatus.offline();
                }
            }, 600);
        }

        resetHttpApolloProviders();
    }
});

const retryLink = new RetryLink({
    delay: {
        initial: 350,
        // max: Infinity,
        max: 6000,
        jitter: true,
    },
    attempts: {
        max: maxRetryLinkAttempts,
        retryIf: (_error, _operation) => {
            // change http provider
            if (
                httpApolloProviders.length > 0 &&
                (!lastOperationName || _operation.operationName === lastOperationName)
            ) {
                httpProvider = httpApolloProviders.pop();
                lastOperationName = _operation.operationName;
            }

            return !!_error;
        },
    },
});

let apolloLinks = [];

/*
if (process.env.NODE_ENV === 'development') {
    apolloLinks.push(loggerLink);
}
*/

apolloLinks = [...apolloLinks, netErrorLink, retryLink, errorLink, httpAuthLink, httpLink];

export const apolloClient = new ApolloClient({
    link: ApolloLink.from(apolloLinks),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
        $query: {
            fetchPolicy: 'network-only', // 'cache-and-network', 'network-only', 'cache-first'
        },
    },
});
