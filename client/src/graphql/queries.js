import gql from 'graphql-tag';

export const queries = {
  getPosts: gql`
    query {
      getPosts {
        _id
        title
        description
        imageUrl
      }
    }
  `
};
