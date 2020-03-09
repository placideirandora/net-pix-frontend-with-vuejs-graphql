import gql from 'graphql-tag';

// User registration
export const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

// User login
export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

// Publish post
export const PUBLISH_POST = gql`
  mutation(
    $title: String!
    $imageUrl: String!
    $categories: [String]!
    $description: String!
    $author: ID!
  ) {
    addPost(
      title: $title
      imageUrl: $imageUrl
      categories: $categories
      description: $description
      creatorId: $author
    ) {
      _id
      title
      imageUrl
      categories
      description
      createdDate
      likes
    }
  }
`;
