import { Tooltip } from 'antd';

import hasAccess from '@/utils/general/hasAccess';

import UserLogin from './Login';
import UserLogout from './Logout';

const UserMenu = () => {
    return (
        <>
            {hasAccess() ? (
                <>
                    <Tooltip title="Logout" placement="bottomRight">
                        <UserLogout />
                    </Tooltip>
                </>
            ) : (
                <>
                    <Tooltip title="Login" placement="bottomRight">
                        <UserLogin />
                    </Tooltip>
                </>
            )}
        </>
    );
};

export default UserMenu;
