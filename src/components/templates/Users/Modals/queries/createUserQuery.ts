import { gql } from '@apollo/client';

const createUserQuery = gql`
    mutation ($data: CreateUserInput!) {
        createUser(data: $data) {
            _id
            name
            email
            login
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`;

export default createUserQuery;
