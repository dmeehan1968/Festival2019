const express = require('express')
const app = express()
const port = 3000

app.get('/', require('../sample/hello-world'))

app.listen(port, () => console.log(`Listening on port ${port}`))
