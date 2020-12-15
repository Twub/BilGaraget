const express = require('express')
const session = require('express-session')
const store = require('better-express-store')

const app = express()
const RestApi = require('./RestApi')

app.use(express.json())

app.use(session({
    secret: require('./session-secret.json'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
    store: store({ dbPath: './database.db' })
}))

app.listen(3000, () => { console.log('Listening on port 3000') })

new RestApi(app)