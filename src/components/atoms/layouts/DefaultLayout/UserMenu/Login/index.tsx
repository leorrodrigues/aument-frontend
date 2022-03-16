import { Tooltip } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { LoginOutlined } from '@ant-design/icons';

import tokenUnset from '@/utils/validators/token/tokenUnset';
import isBrowser from '@/utils/general/isBrowser';

import LoginModal from './LoginModal';

import * as S from './styles';

const UserLogin = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const router = useRouter();

    const onLogin = () => {
        tokenUnset();
    };

    return (
        <Tooltip title="Login at Aument!" placement="bottomRight">
            <S.MenuIcon onClick={() => onLogin()}>
                <LoginOutlined onClick={() => setIsLoginModalOpen(true)} />
                {isLoginModalOpen && (
                    <LoginModal
                        onClose={() => {
                            setIsLoginModalOpen(false);
                            isBrowser && router.push('/');
                        }}
                    />
                )}
            </S.MenuIcon>
        </Tooltip>
    );
};
export default UserLogin;
