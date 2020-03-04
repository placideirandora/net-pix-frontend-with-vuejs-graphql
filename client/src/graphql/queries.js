import gql from 'graphql-tag';

// Posts retrieval
export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      description
      imageUrl
    }
  }
`;
