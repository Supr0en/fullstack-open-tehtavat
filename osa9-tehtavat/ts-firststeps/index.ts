import express from "express";
import calculateBmi from "./bmiCalculator";
import exersiceCalculator from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world!');
});

app.get('/hello', (req, res) => {
    res.send('Hello full stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!height || ! weight) {
        res.status(400).send({error: 'malformatted parameters'});
        return;
    }
    
    res.send({
        height: height,
        weight: weight,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    //eslint-disable-next-line
    const { exercises, dailyTarget } = req.body;
    
    if (!exercises || !dailyTarget) {
        res.status(400).send({error: 'parameters missing'});
        return;
    }
    //eslint-disable-next-line
    res.send(exersiceCalculator(exercises, dailyTarget));
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
