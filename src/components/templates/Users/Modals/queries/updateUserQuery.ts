import { gql } from '@apollo/client';

const updateUserQuery = gql`
    mutation ($data: UpdateUserInput!, $userId: String!) {
        updateUser(data: $data, id: $userId) {
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

export default updateUserQuery;
