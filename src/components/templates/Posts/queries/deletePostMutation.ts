import { gql } from '@apollo/client';

const createPostQuery = gql`
    mutation ($id: String!) {
        deletePost(id: $id)
    }
`;

export default createPostQuery;
