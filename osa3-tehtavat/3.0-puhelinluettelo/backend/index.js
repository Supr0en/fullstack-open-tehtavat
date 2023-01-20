require("dotenv").config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/mongo')

const unknownEndpoint = ( req, res ) => {
  res.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  console.log(JSON.stringify(error));

  if (error.name === 'CastError') {
    return res.status(400).send({ error: error.message });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }
  next(error);
};

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))
app.use(cors());
app.use(express.static('build'));

app.get('/info', async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
  } catch (err) {
    next(err);
  }
});

app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.status(200).send(persons);
  } catch (err) {
    next(err);
  }
});

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const puhNumber = await Person.findById(id);
    res.status(200).send(puhNumber);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Person.findByIdAndDelete(id);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

app.post('/api/persons', async (req, res, next) => {
  try {
    const body = req.body;
  
    if (!body.name || !body.number) {
      return res.status(400).json({ 
        error: 'name or number missing' 
      })
    }
  
    const person = new Person ({
      name: body.name,
      number: body.number
    })

    const newPerson = await person.save();
    res.status(201).send(newPerson);
  } catch (err) {
    next(err); 
  }
});

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const updatedPerson = await Person.updateOne({ _id: req.params.id }, { number: req.body.number });
    res.status(200).send(updatedPerson);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);
app.use(unknownEndpoint);

app.listen(process.env.PORT, (error) => {
  if (error) return console.log(error);
  console.log(`Server running on port ${process.env.PORT}`);
})