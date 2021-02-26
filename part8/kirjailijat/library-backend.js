const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const MONGODB_URI = process.env.URI
const JWT_SECRET = process.env.SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }  

  type Author {
    name: String!,
    bookCount: Int!
    born: Int
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    findBook(name: String!): Book
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      name: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
 Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {

      if (args.author) {
        return Book.find({author: {$in: [args.author] }})
      } 
      if (args.genre) {
        console.log(args.genre)
        return Book.find({genres: {$in: [args.genre] }})
      } 
      return Book.find({})
    },
    findBook: (root, args) => Book.findOne({ title: args.name }),
    allAuthors: () => {
      return Author.find({})
     },
     me: (root, args, context) => {
      return context.currentUser
    }
  },
  

  Author: {
    bookCount: (root) => Book.collection.countDocuments()
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated!")
      }

      console.log('printing new author ', Author.findOne({ name: args.name }))

      let author = await Author.findOne({ name: args.name })

      if  (!author) {
            author = new Author ({
              name: args.name,
              id: uuid()
          })
        author.save() 
        console.log('printing new author ', author)
      }

      const book = new Book ({
        ...args,
        author: author
      })

      console.log(book)

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message), {
          invalidArgs: args
        }
      }
    },

    createUser: (root, args) => {
      const user = new User({ ...args })
  
      console.log(args.username)
      console.log(args.favoriteGenre)

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    editAuthor: async (root, args, context) => {
      let author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated!")
      }

      if (!author) {
        author = new Author ({
          name: args.name,
          born: args.setBornTo
        })
        return author.save()
      } else {
        author.born = args.setBornTo
      }

      try {
        await author.save()
        currentUser.friends = currentUser.friends.concat(author)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})