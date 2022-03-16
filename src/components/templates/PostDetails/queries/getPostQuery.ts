import { gql } from '@apollo/client';

const getPostQuery = gql`
    query ($postId: String!) {
        post(id: $postId) {
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

export default getPostQuery;
