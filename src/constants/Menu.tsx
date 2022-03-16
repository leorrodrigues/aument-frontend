import {
    HomeOutlined,
    TrophyOutlined,
    TagsOutlined,
    ProfileOutlined,
} from '@ant-design/icons';

export type MenuProps = {
    icon: React.ReactNode;
    label: string;
    url?: string;
};

const Home: MenuProps = {
    icon: <HomeOutlined />,
    label: 'Home',
    url: '/',
};

const Posts: MenuProps = {
    icon: <ProfileOutlined />,
    label: 'Posts',
    url: '/posts',
};

const Tags: MenuProps = {
    icon: <TagsOutlined />,
    label: 'Tags',
    url: '/tags',
};

const Users: MenuProps = {
    icon: <TrophyOutlined />,
    label: 'Users',
    url: '/users',
};

export default [Home, Posts, Tags, Users];
