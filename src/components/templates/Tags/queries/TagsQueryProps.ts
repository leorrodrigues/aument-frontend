export interface TagQueryPropsData {
    _id: string;
    name: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export interface TagsQueryPropsData {
    tags: TagQueryPropsData[];
}
