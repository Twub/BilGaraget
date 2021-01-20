const express = require('express')
const bodyParser = require('body-parser')

const session = require('express-session');
const store = require('better-express-store');

const cors = require('cors')
const app = express()
const port = 3000

// rest
const sqlite3 = require("better-sqlite3");
const db = sqlite3("../forum.db");
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

//auth
const Encrypt = require('./Security/Encrypt')

app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const path = require('path')
app.use(express.static(path.join(__dirname, '../bilgaraget/build')))

app.use(session({
    secret: 'yesSecret1254654',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true },
    store: store({dbPath: '../forum.db'})
  }))

  /*
    AcessControl setup
  */
 ac.grant('null').readAny('thread').readAny('user')
    .grant("basic")
    .extend('null')
        .createOwn("thread")
        .readAny('user')
        .updateOwn("user")
        .updateOwn('thread')
        .grant("moderator")
        .extend("basic")
        .updateAny("thread")
        .updateAny('user')
        .deleteAny('moderatorOfThread')
        .grant("admin")
        .extend("moderator")
        .updateAny('userOrModerator')
        .deleteAny("user")
        .deleteAny("thread");


  /*
  Routes
  */
 // DEFAULT ROUTE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
})

// GET THREADS BY CATEGORY ROUTE
app.get('/threads/:categoryId', (req, res) => {
    let statement = db.prepare(/*sql*/ `
        SELECT threads.* FROM threads, categories WHERE threads.cateogryId = $categoryId AND categories.id = $categoryId
    `);

    res.json(statement.all({ categoryId: req.params.categoryId }));
})

// GET REPLIES BY THREAD ID
app.get('/replies/:threadId', (req, res) => {
    let statement = db.prepare(/*sql*/ `
     SELECT replies.* FROM replies, threads WHERE replies.threadId = $threadId AND threads.id = $threadId `);

    res.json(statement.all({ threadId: req.params.threadId }));
})

// GET USER BY USERNAME
app.get('/user/:username', (req, res) => {
    let permission;
    if(req.session.user){
     permission = ac.can(req.session.user.userRole).readAny("user");
    }
    else{
      permission = ac.can('null').readAny('user');
    }
  
   if(permission.granted){
     let statement = db.prepare(/*sql*/ `
           SELECT u.id, u.email, u.username, r.userRole FROM users as u, roles as r
           WHERE u.username = $username AND r.id = u.roleId
        `);
     let user = statement.get({username: req.params.username}) || null;
     if (user) {
       delete user.password;
     }
     res.json(user)
   }
})

// GET MODERATOR BY USER ID
app.get('/moderator/:userId', (req, res) => {
    console.log(req.params.userId);
  let query = `SELECT t.* FROM threadsXmoderator as tXm, threads as t WHERE tXm.userId = ${req.params.userId} AND tXm.threadId = t.id`;
  let statement = db.prepare(query)
  let chosen = statement.all()  
  res.json(chosen);
})

// REMOVE MODERATOR WITH USER ID AND THREAD ID
app.get('/removeModerator/:userId/:threadId', (req, res) => {
    const permission = ac.can(req.session.user.userRole)
    .updateAny("userOrModerator");
    console.log(permission.granted);
    if(permission.granted){
      console.log('before statement');
      let query = `DELETE FROM threadsXmoderator WHERE userId = ${req.params.userId} AND threadId = ${req.params.threadId}`;
      let statement = db.prepare(query);
      let result = statement.run();
      console.log(result);
      res.json(result)
    }
})

// ADD MODERATOR WITH USER ID AND THREAD ID
app.get('/addModerator/:userId/:threadId', (req, res) => {
    const permission = ac
     .can(req.session.user.userRole)
     .updateAny("userOrModerator");
     if(permission.granted){
       let check = isModerator(req.params.threadId, req.params.userId)
       let statement = db.prepare(/*sql*/ `
       INSERT into threadsXmoderator (threadId, userId) VALUES ($threadId, $userId) `)
       res.json(statement.run({threadId: req.params.threadId, userId: req.params.userId}));
       }
})

// LOCK THREAD WITH THREAD ID
app.get('/lockThread/:threadId', (req, res) => {
    let statement = db.prepare(/*sql*/`
    UPDATE threads SET locked = 1 WHERE id = $threadId`)
    res.json(statement.run({threadId : req.params.threadId}))
})

// DELETE REPLY  WITH REPLY ID
app.get('/deleteReply/:replyId', (req, res) => {
    const permission = ac.can(req.session.user.userRole).deleteAny('moderatorOfThread');
    if(permission.granted){
      let statement = db.prepare(/*sql*/ `
      DELETE FROM replies WHERE id = $replyId`)
    
      try{
        res.json(statement.run({replyId: req.params.replyId}))
      } catch{
         res.status(400).json({ error: "error" });
      }
    }
    else{
      res.status(403).json({ error: "You need autorization to access this. " });
    }
})

// GET WHO AM I
app.get('/whoami', (req, res) => {
    res.json(req.session.user || null)
})

// LOGOUT USER
app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json({loggedOut: true})
})

// ADD NEW USER
app.post('/register', (req, res) => {
    if(req.body.password){
        req.body.password = Encrypt.multiEncrypt(req.body.password)
      }
    let statement = db.prepare(/*sql*/`
    INSERT INTO users (email, username, passwordd) values ($email, $username, $password)`)
    res.json(statement.run(req.body))
})

// LOGIN USER
app.post('/login', (req, res) => {
    if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }
      let statement = db.prepare(/*sql*/`
         SELECT u.id, u.email, u.username, r.userRole FROM users as u, roles as r
         WHERE u.email = $email AND u.password = $password AND r.id = u.roleId
      `);
      let userObj = statement.get(req.body) || null;
      if (userObj) {
        delete user.password;
        req.session.user = user;
      }
      res.json(userObj);
})

// CREATE THREAD WITH CATEGORY ID
app.post('/threads/:categoryId', (req, res) => {
    const permission = ac.can(req.session.user.userRole).createOwn("thread");
  if (permission.granted) {
    let statement = db.prepare(/*sql*/ `
   INSERT into threads (title, categoryId, creator, threadInfo) VALUES ($title, $categoryId, $creator, $threadInfo)`);
    res.json(
      statement.run({
        title: req.body.title,
        categoryId: req.params.categoryId,
        creator: req.body.creator,
        threadInfo: req.body.threadInfo,
      })
    );
  } else {
    console.log("you need permission to access this.");
  }
})

// CREATE REPLY WITH THREAD ID
app.post('/replies/:threadId', (req, res) => {
    const permission = ac.can(req.session.user.userRole).createOwn("thread");
  if (permission.granted) {
    let statement = db.prepare(/*sql*/ `INSERT INTO replies (message, threadId, timestamp, sender, warning) VALUES ($message, $threadId, $timestamp, $sender, $warning)
   `);
    res.json(
      statement.run({
        message: req.body.message,
        threadId: req.params.threadId,
        timestamp: req.body.timestamp,
        sender: req.body.sender,
        warning: req.body.warning,
      })
    );
  }
})


app.listen(port)

