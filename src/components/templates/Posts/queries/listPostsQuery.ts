import { gql } from '@apollo/client';

const listPostsQuery = gql`
    query {
        posts {
            _id
            title
            text
            tag {
                name
            }
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`;

export default listPostsQuery;
