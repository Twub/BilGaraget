const express = require('express');
const session = require('express-session');
const store = require('better-express-store');
var cors = require('cors')
const restRoutes = require('./restRoutes')
const authRoutes = require('./authRoutes')
const app = express();

app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://localhost:8080'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}))

app.use(express.json());

app.use(session({
  secret: 'yesSecret1254654',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: !true },
  store: store({dbPath: '../forum.db'})
}))

app.listen(3000, () =>{
  console.log('Listening on port 3000');
})

app.use("/auth", authRoutes)
app.use("/rest", restRoutes)



