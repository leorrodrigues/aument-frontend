import { gql } from '@apollo/client';

export interface LoginInput {
    login: string;
    password: string;
}

export const loginUserQuery = gql`
    mutation ($data: LoginInput!) {
        loginUser(data: $data) {
            accessToken
        }
    }
`;
