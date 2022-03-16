import { gql } from '@apollo/client';

const listUsersQuery = gql`
    query {
        users {
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

export default listUsersQuery;
