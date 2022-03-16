export interface UserQueryPropsData {
    _id: string;
    name: string;
    email: string;
    login: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

export interface UsersQueryPropsData {
    users: UserQueryPropsData[];
}
