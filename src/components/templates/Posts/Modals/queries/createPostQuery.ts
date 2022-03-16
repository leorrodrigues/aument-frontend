import { gql } from '@apollo/client';

const createPostQuery = gql`
    mutation ($data: CreatePostInput!, $file: Upload) {
        createPost(data: $data, file: $file) {
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

export default createPostQuery;
