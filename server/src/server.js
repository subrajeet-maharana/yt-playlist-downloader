import express from 'express';
import fetchData from './routes/fetchData.js';
import cors from 'cors';
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});


app.post('/fetch', fetchData);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


