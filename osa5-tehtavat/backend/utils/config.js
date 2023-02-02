require('dotenv').config()

let PORT =  process.env.PORT
let URI = process.env.DATABASE_URI

module.exports = {
    PORT,
    URI,
}