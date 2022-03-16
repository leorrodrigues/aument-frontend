import { gql } from '@apollo/client';

const listTagsQuery = gql`
    query {
        tags {
            _id
            name
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`;

export default listTagsQuery;
