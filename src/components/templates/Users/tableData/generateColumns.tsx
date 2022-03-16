import { Button, Tooltip } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';

import theme from '@/styles/theme';

import DeleteButton from '@/components/atoms/DeleteButton';

const generateColumns = (
    setIsUpdateUserModalOpen: (isOpen: boolean) => void,
    setSelectedUser: (data: {
        id: string;
        name: string;
        email: string;
        login: string;
    }) => void,
    deleteUserFn?: (data: Record<string, any>) => void,
) => {
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            title: 'email',
            dataIndex: 'email',
        },
        {
            title: 'login',
            dataIndex: 'login',
        },
        {
            title: 'created by',
            dataIndex: 'createdBy',
        },
        {
            title: 'created at',
            dataIndex: 'createdAt',
        },
        {
            title: 'updated by',
            dataIndex: 'updatedBy',
        },
        {
            title: 'updated at',
            dataIndex: 'updatedAt',
        },
        {
            title: 'edit',
            dataIndex: 'edit',
            align: 'center',
            render: (_: any, record: any) => {
                return (
                    <Tooltip title={'Edit User'}>
                        <Button
                            type="text"
                            icon={
                                <EditOutlined
                                    style={{ color: theme.colors.secondary }}
                                />
                            }
                            onClick={() => {
                                setIsUpdateUserModalOpen(true);
                                setSelectedUser({
                                    id: record.key,
                                    name: record.name,
                                    email: record.email,
                                    login: record.login,
                                });
                            }}
                        ></Button>
                    </Tooltip>
                );
            },
        },
        {
            title: '',
            dataIndex: 'delete',
            align: 'center',
            render: (_: any, record: any) => {
                return (
                    <DeleteButton
                        elementId={record.key as string}
                        executeFn={deleteUserFn}
                    />
                );
            },
        },
    ] as ColumnType<any>[];

    return columns;
};

export default generateColumns;
