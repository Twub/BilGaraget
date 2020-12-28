const sqlite3 = require("better-sqlite3");
const db = sqlite3("../database.db");
const Encrypt = require('../Encrypt')

const register = async (req, res) =>{
  console.log('In register');
  if(req.body.password){
    req.body.password = Encrypt.multiEncrypt(req.body.password)
  }
let statement = db.prepare(/*sql*/`
INSERT INTO users (email, name, password) values ($email, $name, $password)`)
res.json(statement.run(req.body))
}

const login = async (req, res) =>{
  console.log('In login');
   if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }
      let statement = db.prepare(/*sql*/`
         SELECT * FROM users
         WHERE email = $email AND password = $password
      `);
      let user = statement.get(req.body) || null;
      if (user) {
        delete user.password;
        // store the logged in user in a session
        req.session.user = user;
      }
      console.log(user);
      res.json(user);
}

const whoami = async (req, res) =>{
  res.json(req.session.user || null)
}

const logout = async (req, res) =>{
  delete req.session.user;
  res.json({loggedOut: true})
}

module.exports = {
  register, 
login,
whoami, 
logout
};