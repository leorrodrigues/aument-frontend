/* istanbul ignore file */
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import isBrowser from '@/utils/general/isBrowser';

import { useApollo } from '@/services/graphql';

import theme from '@/styles/theme';
import GlobalStyles from '@/styles/global';

function SafeHydrate({ children }: any) {
    return <div suppressHydrationWarning>{!isBrowser ? null : children}</div>;
}

const App = ({ Component, pageProps }: AppProps) => {
    const client = useApollo(pageProps.initialApolloState);
    return (
        <SafeHydrate>
            <RecoilRoot>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <ConfigProvider>
                            <Head>
                                <title>{process.env.SITE_NAME!}</title>
                                <link
                                    rel="shortcut icon"
                                    href="/img/logo_aument.png"
                                />
                                <link rel="manifest" href="/manifest.json" />
                                <meta
                                    name="description"
                                    content="React Aument"
                                />
                            </Head>
                            <GlobalStyles />
                            <Component {...pageProps} />
                        </ConfigProvider>
                    </ThemeProvider>
                </ApolloProvider>
            </RecoilRoot>
        </SafeHydrate>
    );
};

export default App;
