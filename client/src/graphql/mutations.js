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

// Comment on a post
export const ADD_POST_COMMENT = gql`
  mutation($commentBody: String!, $postId: ID!, $userId: ID!) {
    addPostComment(
      commentBody: $commentBody
      postId: $postId
      userId: $userId
    ) {
      _id
      messageBody
      messageDate
      messageUser {
        _id
        username
        avatar
      }
    }
  }
`;
