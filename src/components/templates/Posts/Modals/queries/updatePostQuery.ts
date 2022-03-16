import { gql } from '@apollo/client';

const updateTagQuery = gql`
    mutation ($data: UpdatePostInput!, $postId: String!, $file: Upload) {
        updatePost(data: $data, id: $postId, file: $file) {
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

export default updateTagQuery;
