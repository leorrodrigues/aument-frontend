import React from 'react';

import { Card, Image } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

interface PostProps {
    children?: JSX.Element;
    postData: any;
    single?: boolean;
}

const Post = ({ postData, children, single }: PostProps) => (
    <Card
        title={
            <Title
                level={single ? 2 : 4}
                style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    width: '100%',
                }}
            >
                {postData.title}
            </Title>
        }
        bordered={false}
        cover={
            <Image
                alt={postData.title}
                src={postData.imageUrl ?? '/img/no_image.jpeg'}
                style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'contain',
                    borderRadius: '3px',
                }}
            />
        }
    >
        <Text strong>Created at {postData.createdAt}</Text>

        <Paragraph
            ellipsis={{
                rows: single ? 8 : 5,
                expandable: single,
                symbol: 'more',
            }}
            style={{
                fontSize: single ? '20px' : '16px',
                whiteSpace: 'pre-line',
            }}
        >
            {postData.text}
        </Paragraph>

        {children}
    </Card>
);

export default Post;
