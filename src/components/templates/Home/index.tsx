/* istanbul ignore file */
import { Typography } from 'antd';

import DefaultLayout from '@/components/organisms/layouts/DefaultLayout';

import ListNewPosts from './components/ListNewPosts';

const { Title } = Typography;

const Posts = () => {
    return (
        <DefaultLayout>
            <Title level={2}>Newer Posts</Title>
            <ListNewPosts />
        </DefaultLayout>
    );
};

export default Posts;
