// import Head from 'next/head';
import dayjs from 'dayjs';
import { Layout } from 'antd';

import Menu from '@/components/atoms/layouts/DefaultLayout/Menu';
import UserMenu from '@/components/atoms/layouts/DefaultLayout/UserMenu';

import * as S from './styles';

const DefaultLayout = (props: { children: React.ReactNode }) => {
    const { children } = props;

    return (
        <Layout>
            <S.Header>
                <S.Logo src="/img/aument.png" />
                <Menu />
                <UserMenu />
            </S.Header>
            <S.Wrapper>
                <S.Content>{children}</S.Content>
            </S.Wrapper>
            <S.Footer>©Aument {dayjs().format('YYYY')}</S.Footer>
        </Layout>
    );
};

export default DefaultLayout;
