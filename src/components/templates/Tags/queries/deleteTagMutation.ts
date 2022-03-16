import { gql } from '@apollo/client';

const createTagQuery = gql`
    mutation ($id: String!) {
        deleteTag(id: $id)
    }
`;

export default createTagQuery;
