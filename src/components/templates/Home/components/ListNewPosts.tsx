/* istanbul ignore file */
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Typography, Col, Row, Skeleton } from 'antd';

import Post from '@/components/atoms/Post';

import hasAccess from '@/utils/general/hasAccess';

import { globalLoadingStore } from '@/stores/globalLoading';

import { PostsQueryPropsData } from '../../Posts/queries/PostsQueryProps';
import listNewerPostsQuery from './queries/listNewerPostsQuery';

const { Title } = Typography;

const ListNewPosts = () => {
    const globalLoading = useRecoilValue(globalLoadingStore);

    const [posts, setPosts] = useState<PostsQueryPropsData[]>([]);

    const [fetchPosts, { data: postsRawData }] =
        useLazyQuery<PostsQueryPropsData>(listNewerPostsQuery, {
            fetchPolicy: 'no-cache',
        });

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        if (!postsRawData) return;

        const posts = postsRawData.newerPosts.map(data => {
            const post = {
                key: data._id,
                title: data.title,
                text: data.text,
                tagName: data.tag.name,
                imageUrl: data.imageUrl,
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

        setPosts(posts as any);
    }, [postsRawData]);

    const result = posts ? (
        <Row gutter={32}>
            {posts &&
                posts.map((post, index) => (
                    <Col md={8} key={index}>
                        <Post postData={post}>
                            {hasAccess() ? (
                                <Link
                                    href={`/posts/details/?id=${
                                        (post as any).key
                                    }`}
                                >
                                    View details
                                </Link>
                            ) : (
                                <></>
                            )}
                        </Post>
                    </Col>
                ))}
        </Row>
    ) : (
        <Title level={3}>Not found newer posts.</Title>
    );

    return globalLoading ? <Skeleton active /> : result;
};

export default ListNewPosts;
