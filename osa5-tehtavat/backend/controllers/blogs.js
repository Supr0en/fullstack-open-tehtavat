const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
    const user = req.user;
    const blog = await Blog.find({}).populate('user', { username : 1, name : 1 })
    res.json(blog);
})

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(Blog => {
      if (Blog) {
        res.json(Blog)
      } else {
        res.status(404).end()
      }
    })
  .catch(error => next(error))
})
  
blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
      title: body.title,
      author: body.author,
      likes: body.likes ? body.likes : 0,
      url: body.url,
      user: user.id,
  })
  if (!blog.title) {
    res.status(400).send({error: 'Missing title'})
    return;
  }
  if (!blog.url) {
    res.status(400).send({error: 'Missing url'});
    return;
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  res.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', async(req, res, next) => {
  const user = await req.user;
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== user.id){
    res.status(401).send({error: 'invalid user'});
    return;
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end();
})

blogsRouter.put('/:id', (req, res, next) => {
    const body = req.body;

    const blog = {
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
    }

    Blog.findByIdAndUpdate(req.params.id, blog)
    .then(updatedBlog => {
      res.json(Blog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter