require('dotenv').config()

let PORT = process.env.PORT
let URI = process.env.URI

module.exports = {
  URI,
  PORT
}