
import config from '@app/config';
import router from '@app/routes'
import connectDB from '@app/config/db';

const express = require('express')
const app = express()
const port = config.port;

app.use('/api', router);
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})