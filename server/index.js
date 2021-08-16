
import config from '@app/config';
import router from '@app/routes'

const express = require('express')
const app = express()
const port = config.port;

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})