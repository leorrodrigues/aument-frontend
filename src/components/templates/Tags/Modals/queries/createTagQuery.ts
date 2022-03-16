import { gql } from '@apollo/client';

const createTagQuery = gql`
    mutation ($data: CreateTagInput!) {
        createTag(data: $data) {
            _id
            name
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`;

export default createTagQuery;
