import { Button, Tooltip } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

import theme from '@/styles/theme';

import DeleteButton from '@/components/atoms/DeleteButton';
import Link from 'next/link';

const generateColumns = (
    setIsUpdatePostModalOpen: (isOpen: boolean) => void,
    setSelectedPost: (data: {
        id: string;
        title: string;
        text: string;
        tagName: string;
    }) => void,
    deletePostFn?: (data: Record<string, any>) => void,
) => {
    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
        },
        {
            title: 'text',
            dataIndex: 'text',
            // ellipsis: true,
            width: 300,
            render: (_, record: any) => {
                return `${record.text.substring(0, 300)}${
                    record.text.length > 300 ? '...' : ''
                }`;
            },
        },
        {
            title: 'tag name',
            dataIndex: 'tagName',
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
            title: 'View',
            dataIndex: 'view',
            align: 'center',
            render: (_: any, record: any) => {
                return (
                    <Tooltip title={'View'}>
                        <Link href={`/posts/details/?id=${record.key}`}>
                            <EyeOutlined
                                style={{
                                    cursor: 'pointer',
                                    color: theme.colors.secondary,
                                }}
                            />
                        </Link>
                    </Tooltip>
                );
            },
        },
        {
            title: 'edit',
            dataIndex: 'edit',
            align: 'center',
            render: (_: any, record: any) => {
                return (
                    <Tooltip title={'Edit Post'}>
                        <Button
                            type="text"
                            icon={
                                <EditOutlined
                                    style={{ color: theme.colors.secondary }}
                                />
                            }
                            onClick={() => {
                                setIsUpdatePostModalOpen(true);
                                setSelectedPost({
                                    id: record.key,
                                    title: record.title,
                                    text: record.text,
                                    tagName: record.tagName,
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
                        executeFn={deletePostFn}
                    />
                );
            },
        },
    ] as ColumnType<any>[];

    return columns;
};

export default generateColumns;
