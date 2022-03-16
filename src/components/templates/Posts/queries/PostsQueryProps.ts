export interface PostQueryPropsData {
    _id: string;
    title: string;
    text: string;
    tag: {
        name: string;
    };
    imageUrl?: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

export interface NewerPostsQueryPropsData {
    newerPosts: PostQueryPropsData[];
}

export interface PostsQueryPropsData {
    posts: PostQueryPropsData[];
}
