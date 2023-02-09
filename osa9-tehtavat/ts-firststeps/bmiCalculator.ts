const calculateBmi = ( height: number, weight: number ) => {
    const heightToMeters = height * 0.01;
    const personBMI = Number((weight / (heightToMeters * heightToMeters)).toFixed(1));

    let results = '';

    if (personBMI >= 0 && personBMI <= 18.9) {
        results = 'Underweight';
    }
    if (personBMI >= 19 && personBMI <= 24.9) {
        results = 'Normal weight';
    }
    if (personBMI >= 25) {
        results = 'Overweight';
    }
    return results;
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));

export default calculateBmi;