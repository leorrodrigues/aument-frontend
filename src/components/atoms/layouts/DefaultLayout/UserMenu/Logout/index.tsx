import { Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { LogoutOutlined } from '@ant-design/icons';

import tokenUnset from '@/utils/validators/token/tokenUnset';
import isBrowser from '@/utils/general/isBrowser';

import * as S from './styles';

const UserLogout = () => {
    const router = useRouter();

    const onLogout = () => {
        tokenUnset();
        isBrowser && router.push('/');
    };

    return (
        <Tooltip title="Logout" placement="bottomRight">
            <S.MenuIcon onClick={() => onLogout()}>
                <LogoutOutlined />
            </S.MenuIcon>
        </Tooltip>
    );
};
export default UserLogout;
