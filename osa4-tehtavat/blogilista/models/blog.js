const mongoose = require('mongoose');
const config = require('../utils/config');

const blogSchema = mongoose.Schema({
    url: String,
    title: String,
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.URI;

mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl);


module.exports = mongoose.model('Blog', blogSchema);