/* istanbul ignore file */
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { useEffect, useMemo, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, notification, Row, Skeleton, Table, Typography } from 'antd';

import DefaultLayout from '@/components/organisms/layouts/DefaultLayout';

import { globalLoadingStore } from '@/stores/globalLoading';

import tokenUnset from '@/utils/validators/token/tokenUnset';
import isBrowser from '@/utils/general/isBrowser';

import generateColumns from './tableData/generateColumns';

import CreateUserModal from './Modals/CreateUserModal';
import UpdateUserModal from './Modals/UpdateUserModal';

import listUsersQuery from './queries/listUsersQuery';
import deleteUserMutation from './queries/deleteUserMutation';
import { UsersQueryPropsData } from './queries/UsersQueryProps';

const { Title } = Typography;

const Users = () => {
    const router = useRouter();

    const setGlobalLoading = useSetRecoilState(globalLoadingStore);

    const [users, setUsers] = useState<any>([]);
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{
        id: string;
        name: string;
        email: string;
        login: string;
    }>();

    const [deleteUserFn] = useMutation(deleteUserMutation, {
        onCompleted() {
            setGlobalLoading(false);
            notification.success({
                message: 'User deleted!',
            });
            fetchUsers();

            tokenUnset();
            isBrowser && router.push('/');
        },
        onError(err) {
            setGlobalLoading(false);
            console.error('onError', err);
        },
    });

    const columns = useMemo(
        () =>
            generateColumns(
                setIsUpdateUserModalOpen,
                setSelectedUser,
                deleteUserFn,
            ),
        [deleteUserFn],
    );

    const [fetchUsers, { data: usersRawData, loading }] =
        useLazyQuery<UsersQueryPropsData>(listUsersQuery, {
            fetchPolicy: 'no-cache',
        });

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (!usersRawData) return;

        const users = usersRawData.users.map(data => {
            const user = {
                key: data._id,
                name: data.name,
                email: data.email,
                login: data.login,
                createdBy: data.createdBy,
                createdAt: dayjs(Number.parseInt(data.createdAt, 10)).format(
                    'MM-DD-YYYY [at] HH:mm[h]',
                ),
                updatedBy: data.updatedBy ?? '-',
                updatedAt: data.updatedAt
                    ? dayjs(Number.parseInt(data.updatedAt, 10)).format(
                          'MM-DD-YYYY [at] HH:mm[h]',
                      )
                    : '-',
            };
            return user;
        });

        setUsers(users);
    }, [usersRawData]);

    return (
        <DefaultLayout>
            <Title level={2}>Users</Title>
            <Row justify="end" style={{ marginBottom: '24px' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreateUserModalOpen(true)}
                >
                    New User
                </Button>
            </Row>
            {loading ? (
                <Skeleton active />
            ) : (
                <Table columns={columns} dataSource={users} />
            )}
            {isCreateUserModalOpen && (
                <CreateUserModal
                    onClose={() => {
                        setIsCreateUserModalOpen(false);
                        fetchUsers();
                    }}
                />
            )}
            {isUpdateUserModalOpen && (
                <UpdateUserModal
                    onClose={() => {
                        setIsUpdateUserModalOpen(false);
                        fetchUsers();
                    }}
                    selectedUser={selectedUser!}
                />
            )}
        </DefaultLayout>
    );
};

export default Users;
