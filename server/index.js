import config from '@app/config';
import router from '@app/routes';
import connectDB from '@app/config/db';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

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
