const express = require('express')
const app = express()
const port = 3000
const helloWorld = require('../sample/hello-world')

app.get('/', helloWorld)

app.listen(port, () => console.log(`Listening on port ${port}`))
