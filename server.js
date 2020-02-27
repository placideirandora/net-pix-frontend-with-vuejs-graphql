const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');
const Post = require('./models/Post');

// Read the GraphQL file and assign the defined types
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');

// Configure environment variables
dotenv.config({ path: 'variables.env' });

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch(err => {
    console.error('Database Not Connected Due To: ', err);
  });

// Initialize the Apollo Server
const server = new ApolloServer({
  typeDefs,
  context: { User, Post }
});

// Start the server
server.listen(5000).then(({ url }) => {
  console.log(`Server listening on: ${url}`);
});
