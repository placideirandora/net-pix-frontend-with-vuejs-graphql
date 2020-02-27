const { ApolloServer, gql } = require("apollo-server");

// Dummy data
const todos = [
  { task: "Read Some Books", completed: false },
  { task: "Play Billiards", completed: true }
];

// Define the types
const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
      addTodos(task: String, completed: Boolean): Todo
  }
`;

// Resolve the queries and mutations
const resolvers = {
  Query: {
    getTodos: () => todos,
  },
  Mutation: {
      addTodos: (_, { task, completed }) => {
          const todo = { task: task, completed: completed };
          todos.push(todo);
          return todo;
      }
  }
};

// Initialize the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen(5000).then(({ url }) => {
  console.log(`Server listening on: ${url}`);
});
