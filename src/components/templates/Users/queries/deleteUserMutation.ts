import { gql } from '@apollo/client';

const createUserQuery = gql`
    mutation ($id: String!) {
        deleteUser(id: $id)
    }
`;

export default createUserQuery;
