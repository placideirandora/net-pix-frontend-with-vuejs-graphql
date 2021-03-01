import gql from 'graphql-tag';

// User registration
export const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      token
      userId
    }
  }
`;

// User login
export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      userId
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

// Like a post
export const LIKE_POST = gql`
  mutation($postId: ID!, $username: String!) {
    likePost(postId: $postId, username: $username) {
      likes
      favorites {
        _id
        title
        imageUrl
      }
    }
  }
`;

// Unlike a post
export const UNLIKE_POST = gql`
  mutation($postId: ID!, $username: String!) {
    unlikePost(postId: $postId, username: $username) {
      likes
      favorites {
        _id
        title
        imageUrl
      }
    }
  }
`;
