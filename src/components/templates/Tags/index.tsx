/* istanbul ignore file */
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';
import { useEffect, useMemo, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, notification, Row, Skeleton, Table, Typography } from 'antd';

import DefaultLayout from '@/components/organisms/layouts/DefaultLayout';

import { globalLoadingStore } from '@/stores/globalLoading';

import generateColumns from './tableData/generateColumns';

import CreateTagModal from './Modals/CreateTagModal';
import UpdateTagModal from './Modals/UpdateTagModal';

import listTagsQuery from './queries/listTagsQuery';
import deleteTagMutation from './queries/deleteTagMutation';
import { TagsQueryPropsData } from './queries/TagsQueryProps';

const { Title } = Typography;

const Tags = () => {
    const setGlobalLoading = useSetRecoilState(globalLoadingStore);

    const [tags, setTags] = useState<any>([]);
    const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);
    const [isUpdateTagModalOpen, setIsUpdateTagModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] =
        useState<{ id: string; name: string }>();

    const [deleteTagFn] = useMutation(deleteTagMutation, {
        onCompleted() {
            setGlobalLoading(false);
            notification.success({
                message: 'Tag deleted!',
            });
            fetchTags();
        },
        onError(err) {
            setGlobalLoading(false);
            console.error('onError', err);
        },
    });

    const columns = useMemo(
        () =>
            generateColumns(
                setIsUpdateTagModalOpen,
                setSelectedTag,
                deleteTagFn,
            ),
        [deleteTagFn],
    );

    const [fetchTags, { data: tagsRawData, loading }] =
        useLazyQuery<TagsQueryPropsData>(listTagsQuery, {
            fetchPolicy: 'no-cache',
        });

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    useEffect(() => {
        if (!tagsRawData) return;

        const tags = tagsRawData.tags.map(data => {
            const tag = {
                key: data._id,
                name: data.name,
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
            return tag;
        });

        setTags(tags);
    }, [tagsRawData]);

    return (
        <DefaultLayout>
            <Title level={2}>Tags</Title>
            <Row justify="end" style={{ marginBottom: '24px' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreateTagModalOpen(true)}
                >
                    New Tag
                </Button>
            </Row>
            {loading ? (
                <Skeleton active />
            ) : (
                <Table columns={columns} dataSource={tags} />
            )}
            {isCreateTagModalOpen && (
                <CreateTagModal
                    onClose={() => {
                        setIsCreateTagModalOpen(false);
                        fetchTags();
                    }}
                />
            )}
            {isUpdateTagModalOpen && (
                <UpdateTagModal
                    onClose={() => {
                        setIsUpdateTagModalOpen(false);
                        fetchTags();
                    }}
                    selectedTag={selectedTag!}
                />
            )}
        </DefaultLayout>
    );
};

export default Tags;
