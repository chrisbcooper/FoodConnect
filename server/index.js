const express = require('express')

import config from '@app/config';
const app = express()
const port = config.port;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})