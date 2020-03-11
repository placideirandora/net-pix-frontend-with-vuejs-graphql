import gql from 'graphql-tag';

// Retrieve a logged-in user
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      password
      avatar
      joinDate
      favorites {
        _id
        title
        imageUrl
      }
    }
  }
`;

// Retrieve all posts
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

// Retrieve posts gradually
export const INFINITE_SCROLL_POSTS = gql`
  query($pageNum: Int!, $pageSize: Int!) {
    infiniteScrollPosts(pageNum: $pageNum, pageSize: $pageSize) {
      hasMore
      posts {
        _id
        title
        description
        imageUrl
        categories
        likes
        createdDate
        createdBy {
          _id
          username
          avatar
        }
        messages {
          _id
        }
      }
    }
  }
`;

// Retrieve a specific post
export const GET_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      _id
      title
      description
      imageUrl
      categories
      likes
      createdDate
      messages {
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
  }
`;
