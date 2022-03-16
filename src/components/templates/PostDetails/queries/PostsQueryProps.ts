export interface PostQueryPropsData {
    post: {
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
    };
}
