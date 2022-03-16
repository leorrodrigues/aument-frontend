import { NextPage } from 'next';
import { useRouter } from 'next/router';

import isBrowser from '@/utils/general/isBrowser';

import hasAccess from './hasAccess';

interface WithAuthProps {
    Component: NextPage;
}

function SafeHydrate({ children }: any) {
    return <div suppressHydrationWarning>{!isBrowser ? null : children}</div>;
}

const WithAuth = ({ Component }: WithAuthProps) => {
    const Auth = (props: any) => {
        const router = useRouter();

        const isLoggedIn = isBrowser && hasAccess();

        if (isLoggedIn) {
            return (
                <SafeHydrate>
                    <Component {...props} />
                </SafeHydrate>
            );
        } else if (!isLoggedIn && isBrowser) {
            router.push('/');
        }

        return <SafeHydrate />;
    };

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default WithAuth;
