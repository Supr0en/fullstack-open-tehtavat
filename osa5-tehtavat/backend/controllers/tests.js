const express = require('express');
const testRouter = express.Router();
const User = require('../models/user');
const Blog = require('../models/blog');

testRouter.post('/reset', async (req, res) => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    res.status(204).end();
});

module.exports = testRouter;
