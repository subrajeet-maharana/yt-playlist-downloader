import express from 'express';
import fetchData from './routes/fetchData.js';
import downloadData from './routes/downloadData.js';
import cors from 'cors';
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/fetch', fetchData);
app.post('/download', downloadData);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


