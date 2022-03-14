import '@testing-library/jest-dom';
import 'jest-styled-components';

window.matchMedia =
    window.matchMedia ||
    function (query) {
        return {
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };
    };

jest.mock('next/head', () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({ children }: { children: Array<React.ReactElement> }) => {
            return <>{children}</>;
        },
    };
});

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn(),
}));
