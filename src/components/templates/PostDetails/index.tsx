/* istanbul ignore file */
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';

import Post from '@/components/atoms/Post';
import DefaultLayout from '@/components/organisms/layouts/DefaultLayout';

import getPostQuery from './queries/getPostQuery';
import { PostQueryPropsData } from './queries/PostsQueryProps';

const Posts = () => {
    const router = useRouter();
    const postId = useMemo(() => router.query.id, [router]);

    const [post, setPost] = useState<any>([]);

    const [fetchPost, { data: postRawData }] = useLazyQuery<PostQueryPropsData>(
        getPostQuery,
        {
            fetchPolicy: 'no-cache',
        },
    );

    useEffect(() => {
        if (postId) {
            fetchPost({ variables: { postId } });
        }
    }, [fetchPost, postId]);

    useEffect(() => {
        if (!postRawData) return;

        const post = {
            key: postRawData.post._id,
            title: postRawData.post.title,
            text: postRawData.post.text,
            tagName: postRawData.post.tag.name,
            imageUrl: postRawData.post.imageUrl,
            createdBy: postRawData.post.createdBy,
            createdAt: dayjs(
                Number.parseInt(postRawData.post.createdAt, 10),
            ).format('MM-DD-YYYY [at] HH:mm[h]'),
            updatedBy: postRawData.post.updatedBy ?? '-',
            updatedAt: postRawData.post.updatedAt
                ? dayjs(Number.parseInt(postRawData.post.updatedAt, 10)).format(
                      'MM-DD-YYYY [at] HH:mm[h]',
                  )
                : '-',
        };

        setPost(post);
    }, [postRawData]);

    return (
        <DefaultLayout>
            <Post single postData={post}></Post>
        </DefaultLayout>
    );
};

export default Posts;
