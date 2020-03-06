const bcrypt = require('bcrypt');
const createToken = require('./helpers/generateToken');

module.exports = {
  Query: {
    getCurrentUser: async (_, args, { User, currentUser: { username } }) => {
      if (!username) {
        return null;
      }

      const user = await User.findOne({ username }).populate({
        path: 'favorites',
        model: 'Post'
      });

      return user;
    },
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        });
      return posts;
    }
  },
  Mutation: {
    registerUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });

      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await new User({ username, email, password }).save();

      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },
    loginUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      const message = 'Incorrect username or password';

      if (!user) {
        throw new Error(message);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error(message);
      }

      return { token: createToken(user, process.env.SECRET, '1hr') };
    },
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();
      return newPost;
    }
  }
};
