require("dotenv").config();

const mongoose = require('mongoose');

const dbUrl = process.env.DATABASE_URI;

mongoose.set('strictQuery', false);
mongoose.connect(dbUrl).then(() => console.log('Connected to database')).catch(error => console.error(error));;

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        milength: 3,
        required: true,
        validate: {
            validator: (value) => {return value && value.length >= 3;},
            message: props => `${props.value} is not a valid name`
        }
    },
    number: {
        type: String,
        milength: 8,
        required: true,
        validate: {
            validator: (value) => /\d{2,3}-\d{6}/.test(value),
            message: props => `${props.value} is not a valid number`
        }
    }
});
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);