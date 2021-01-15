const sqlite3 = require("better-sqlite3");
const db = sqlite3("../forum.db");
const Encrypt = require('./Security/Encrypt')

const signUp = async (req, res) =>{
  if(req.body.password){
    req.body.password = Encrypt.multiEncrypt(req.body.password)
  }
let statement = db.prepare(/*sql*/`
INSERT INTO users (email, username, passwordd) values ($email, $username, $password)`)
res.json(statement.run(req.body))
}

const signIn = async (req, res) =>{
   if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }
      let statement = db.prepare(/*sql*/`
         SELECT u.id, u.email, u.username, r.userRole FROM users as u, roles as r
         WHERE u.email = $email AND u.password = $password AND r.id = u.roleId
      `);
      let userObj = await statement.get(req.body) || null;
      if (userObj) {
        delete user.password;
        req.session.user = user;
      }
      res.json(userObj);
}

const logout = async (req, res) =>{
  delete req.session.user;
  res.json({loggedOut: true})
}

const whoami = async (req, res) =>{
  res.json(req.session.user || null)
}



module.exports = {
  signUp, 
  signIn,
whoami, 
logout
};