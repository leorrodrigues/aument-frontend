import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/lib/table';

import theme from '@/styles/theme';

import DeleteButton from '@/components/atoms/DeleteButton';

const generateColumns = (
    setIsUpdateTagModalOpen: (isOpen: boolean) => void,
    setSelectedTag: (data: { id: string; name: string }) => void,
    deleteTagFn?: (data: Record<string, any>) => void,
) => {
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
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
                    <Tooltip title={'Edit Tag'}>
                        <Button
                            type="text"
                            icon={
                                <EditOutlined
                                    style={{ color: theme.colors.secondary }}
                                />
                            }
                            onClick={() => {
                                setIsUpdateTagModalOpen(true);
                                setSelectedTag({
                                    id: record.key,
                                    name: record.name,
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
                        executeFn={deleteTagFn}
                    />
                );
            },
        },
    ] as ColumnType<any>[];

    return columns;
};

export default generateColumns;
