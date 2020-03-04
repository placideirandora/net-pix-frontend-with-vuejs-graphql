import gql from 'graphql-tag';

export const GetPosts = gql`
  query {
    getPosts {
      _id
      title
      description
      imageUrl
    }
  }
`;
