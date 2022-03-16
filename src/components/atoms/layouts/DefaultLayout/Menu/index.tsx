import uniqid from 'uniqid';
import Link from 'next/link';

import MenuItems from '@/constants/Menu';

import hasAccess from '@/utils/general/hasAccess';

import * as S from './styles';

const Menu = () => (
    <>
        <S.Menu theme="dark" mode="horizontal" selectable={false}>
            {MenuItems.map(
                item =>
                    hasAccess() && (
                        <S.MenuItem key={uniqid()} icon={item.icon}>
                            <Link href={item.url!}>
                                <span>{item.label}</span>
                            </Link>
                        </S.MenuItem>
                    ),
            )}
        </S.Menu>
    </>
);

export default Menu;
