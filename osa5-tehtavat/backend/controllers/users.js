const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title : 1, author : 1 });
  res.json(users);
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if(username.length < 3 || password.length < 3) {
    res.status(400).send({error: 'Invalid username or password'});
    return;
  }

  const users = await User.find();
  const isUser = users.find(user => user.username === username)

  if(isUser) {
    res.status(400).send({error: 'user name is not unique'});
    return;
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter