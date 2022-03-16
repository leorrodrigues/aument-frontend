import { Layout } from 'antd';
import styled from 'styled-components';

import theme from '@/styles/theme';

import isBrowser from '@/utils/general/isBrowser';

export const Header = styled(Layout.Header)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const Logo = styled.img<any>`
    align-self: center;
    max-height: 64px;
    height: auto;
    width: auto;
    padding: 8px;
`;

export const Wrapper = styled(Layout.Content)`
    padding: ${isBrowser && window.innerWidth > theme.breakpoints['md']
        ? '0 24px'
        : '0 16px'};
    min-height: calc(100vh - ${theme.header_height} - ${theme.footer_height});
    height: 100%;
`;
export const Content = styled.div`
    margin: 24px 0;
    padding: 16px;
    background: #fff;
`;

export const Footer = styled(Layout.Footer)`
    text-align: center;
    height: ${theme.footer_height};
`;
