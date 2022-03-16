import { gql } from '@apollo/client';

const listNewerPostsQuery = gql`
    query {
        newerPosts {
            _id
            title
            text
            tag {
                name
            }
            imageUrl
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`;

export default listNewerPostsQuery;
