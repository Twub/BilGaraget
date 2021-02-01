const sqlite3 = require("better-sqlite3");
const db = sqlite3("../forum.db");
const Encrypt = require('./Security/Encrypt')

const signUp = async (req, res) => {
  // does register form contain @?
  if (req.body && req.body.email.includes('@')) {
    // have the user typed in a password?
    if (req.body.password != undefined){
      // checks the length of the password
      // returns true if the password is >= 8 characters.
      let correctPassword = hasPasswordCorrectLength(req.body.password)
      // if password is < 8 returns a error message
      if (!correctPassword){
        res.status(400).json({ error: "You need to type in a longer password. The password needs to be atleast 8 characters" })
        return
      }
    }
    // checks if the username is a empty string
    if (req.body.username === ''){
      res.status(400).json({ error: "You need to have a username" })
      return
    }
    // check if the user has typed in a unique email and username
    let hasUniqueEmail = userHasUniqueEmail(req.body.email)
    let hasUniqueUsername = userHasUniqueUsername(req.body.username)

    // if email and username is unique add user to db.
    if (hasUniqueEmail === true && hasUniqueUsername === true){
      // Encrypt user password
      if (req.body.password){
        req.body.password = Encrypt.multiEncrypt(req.body.password)
      }
      let statement = db.prepare(/*sql*/ `
        INSERT INTO users (email, username, password, roleId) values ($email, $username, $password, $roleId)`);

      // try to add the user to the db or catch and return a error message
      try {
        res.status(200).json(statement.run(req.body))
      }catch{
        res.status(400).json({ error: "Error while adding the new user to the db" })
      }
    }else if (hasUniqueUsername === true && userHasUniqueEmail === false){
      // returns 400 error code with error message if the email isn´t unique.
      res.status(400).json({ error: "Not a valid username" })
    }else if (hasUniqueUsername === false && userHasUniqueEmail === true){
      // returns 400 error code with error message if the username isn´t unique.
      res.status(400).json({ error: "Not a valid email." })
    }else {
      // returns 400 error code with error message if the username and email isn´t unique.
      res.status(400).json({ error: "Not valid username and email." })
    }
  }
}

const hasPasswordCorrectLength = (password) => {
  if (password.length >= 8){
    return true
  }
  
  return false
}

const userHasUniqueEmail = (email) => {
  let statement = db.prepare(
    /*sql*/ `SELECT * FROM users WHERE email = $email`
  )
  
  let res = statement.all({ email: email })
  
  if (res.length > 0) {
    return false
  }

  return true
}

const userHasUniqueUsername = (username) => {
  let statement = db.prepare(
    /*sql*/ `SELECT * FROM users WHERE username = $username`
  )

  let result = statement.all({ username: username })
  
  if (result.length > 0){
    return false
  }

  return true
}

const signIn = async (req, res) =>{
   if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }
      console.log(req.body)
      let statement = db.prepare(/*sql*/`
      SELECT u.id, u.email, u.username, r.userRole FROM users as u, roles as r
      WHERE u.email = $email AND u.password = $password AND r.id = u.roleId
      `);
      let userObj = await statement.get(req.body) || null;
      console.log('HELLO I`M LOGGIN IN NOW!!', userObj)
      if (userObj) {
        delete userObj.password;
        req.session.user = userObj;
      }
      console.log(req.session.user)
      res.json(userObj);
}

const logout = async (req, res) =>{
  console.log('INSIDE LOGOUT', req.session.user)
  delete req.session.user;
  res.json({loggedOut: true})
}

const whoami = async (req, res) =>{
  console.log('INSIDE WHO AM I: ', req.session.user)
  res.json(req.session.user || null)
}

module.exports = {
  signUp, 
  signIn,
whoami, 
logout
};