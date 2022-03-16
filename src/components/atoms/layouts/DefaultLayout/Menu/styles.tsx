import styled from 'styled-components';
import theme from 'styles/theme';
import { Menu as AntdMenu } from 'antd';

const backgroundHover = 'rgba(255, 255, 255, 0.1)';

export const Menu = styled(AntdMenu)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
`;

export const MenuItem = styled(AntdMenu.Item)`
    a {
        color: ${theme.colors.white};
    }
    :hover {
        background: ${backgroundHover} !important;
    }
`;
