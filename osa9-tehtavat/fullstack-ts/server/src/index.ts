import express from 'express';
import cors from 'cors';
import patients from './data/patients';
import diagnoses from './data/diagnoses';
import { v4 as uuidv4 } from 'uuid';
const app = express();

app.use(express.json());
app.use(cors());

enum Gender {
    Other = 'Other',
    Male = 'Male',
    Female = 'Female',
}

interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

interface PatientData {
    name: string;
    ssn: string;
    dateOfBirth: string;
    occupation: string;
    gender: Gender;
}

interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
}

type newPatients = Exclude<Patients, 'ssn'>;

const PORT = 5000;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/api/diagnoses', (req, res) => {
    const data: Diagnoses[] = diagnoses;
    res.send(data);
});

app.get('/api/patients', (req, res) => {
    const data: newPatients[] = patients;
    const newData: newPatients[] = data.map((patient) => {
        const newPatients = { ...patient };
        delete newPatients.ssn;
        return newPatients;
    });
    res.send(newData);
});

app.get('/api/patients/:id', (req, res) => {
    const data: PatientData[] = patients;

    res.json(data);
});

app.post('/api/patients', (req, res) => {
    const patientData: PatientData = req.body;
    const id = uuidv4();

    res.send({
        id: id,
        ...patientData,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
