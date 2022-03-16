import theme from '@/styles/theme';
import styled, { css } from 'styled-components';

export const MenuIcon = styled.div`
    ${() =>
        css`
            color: ${theme.colors.white};
            display: inline-block;
            padding: 0 10px;
            width: 40px;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s, padding 0s;
            &:hover {
                background: rgba(255, 255, 255, 0.1);
            }
        `}
`;
