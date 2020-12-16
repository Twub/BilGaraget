const express = require('express')
const session = require('express-session')
const store = require('better-express-store')
var cors = require('cors')

const app = express()
app.use(cors())

const RestApi = require('./RestApi')
const ACL = require('./ACL')
const ACLsettings = require('./ACLsettings')

app.use(express.json())

//PREVENTS CRASH FOR BAD FORMATTED JSON
app.use((error, req, res, next) => {
    console.log("ERROR: ", error)
    if (error){
        res-status(500)
        res.json({
            error: 'Something went wrong',
            errorDetails: error
        })
    }
})

app.use(session({
    secret: require('./session-secret.json'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
    store: store({ dbPath: './database.db' })
}))

app.listen(3000, () => { console.log('Listening on port 3000') })

new RestApi(app)