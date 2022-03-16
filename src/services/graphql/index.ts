/* istanbul ignore file */
import { useMemo } from 'react';
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    from,
    ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

import { notification } from 'antd';

import isBrowser from '@/utils/general/isBrowser';

let apolloCLient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    const { response } = operation.getContext();
    const { operationName } = operation;
    const status = response ? response.status : 500;
    console.error({ status, networkError });

    if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
            notification.error({
                message: `Status: ${status} ${
                    operationName ? '(' + operationName + ')' : ''
                }`,
                description: `${message}`,
            });
        });
    } else if (networkError) {
        notification.error({
            message: `${status}: ${networkError.message || 'Connection Error'}`,
            description: `${
                networkError.message === 'Failed to fetch'
                    ? 'Unable to connect to server'
                    : networkError.stack
            }`,
        });
    }
});

const responseLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        return response;
    });
});

function createApolloClient() {
    const token = isBrowser ? localStorage.getItem('token') : null;
    return new ApolloClient({
        ssrMode: isBrowser,
        link: from([
            errorLink,
            responseLink,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            new createUploadLink({
                uri: process.env.API_URL!,
                headers: {
                    authorization: token,
                },
            }),
        ]),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = {}) {
    const apolloClientGlobal = apolloCLient ?? createApolloClient();

    if (initialState) {
        apolloClientGlobal.cache.restore(initialState);
    }

    if (isBrowser) return apolloClientGlobal;

    apolloCLient = apolloCLient ?? apolloClientGlobal;

    return apolloCLient;
}

export function useApollo(initialState = {}) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);

    return store;
}
