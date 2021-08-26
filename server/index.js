import config from './src/config/index.js';
import router from './src/routes/index.js';
import connectDB from './src/config/db.js';

import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = config.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
connectDB();

app.use('/api', router);

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`App listending at PORT:${PORT}`);
});
