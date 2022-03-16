import { gql } from '@apollo/client';

const updateTagQuery = gql`
    mutation ($data: UpdateTagInput!, $tagId: String!) {
        updateTag(data: $data, id: $tagId) {
            _id
            name
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`;

export default updateTagQuery;
