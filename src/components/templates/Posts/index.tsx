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

import CreatePostModal from './Modals/CreatePostModal';
import UpdatePostModal from './Modals/UpdatePostModal';

import listPostsQuery from './queries/listPostsQuery';
import deletePostMutation from './queries/deletePostMutation';
import { PostsQueryPropsData } from './queries/PostsQueryProps';

const { Title } = Typography;

const Posts = () => {
    const setGlobalLoading = useSetRecoilState(globalLoadingStore);

    const [posts, setPosts] = useState<any>([]);
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [isUpdatePostModalOpen, setIsUpdatePostModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<{
        id: string;
        title: string;
        text: string;
        tagName: string;
    }>();

    const [deletePostFn] = useMutation(deletePostMutation, {
        onCompleted() {
            setGlobalLoading(false);
            notification.success({
                message: 'Post deleted!',
            });
            fetchPosts();
        },
        onError(err) {
            setGlobalLoading(false);
            console.error('onError', err);
        },
    });

    const columns = useMemo(
        () =>
            generateColumns(
                setIsUpdatePostModalOpen,
                setSelectedPost,
                deletePostFn,
            ),
        [deletePostFn],
    );

    const [fetchPosts, { data: postsRawData, loading }] =
        useLazyQuery<PostsQueryPropsData>(listPostsQuery, {
            fetchPolicy: 'no-cache',
        });

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        if (!postsRawData) return;

        const posts = postsRawData.posts.map(data => {
            const post = {
                key: data._id,
                title: data.title,
                text: data.text,
                tagName: data.tag.name,
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
            return post;
        });

        setPosts(posts);
    }, [postsRawData]);

    return (
        <DefaultLayout>
            <Title level={2}>Posts</Title>
            <Row justify="end" style={{ marginBottom: '24px' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreatePostModalOpen(true)}
                >
                    New Post
                </Button>
            </Row>
            {loading ? (
                <Skeleton active />
            ) : (
                <Table columns={columns} dataSource={posts} />
            )}
            {isCreatePostModalOpen && (
                <CreatePostModal
                    onClose={() => {
                        setIsCreatePostModalOpen(false);
                        fetchPosts();
                    }}
                />
            )}
            {isUpdatePostModalOpen && (
                <UpdatePostModal
                    onClose={() => {
                        setIsUpdatePostModalOpen(false);
                        fetchPosts();
                    }}
                    selectedPost={selectedPost!}
                />
            )}
        </DefaultLayout>
    );
};

export default Posts;
