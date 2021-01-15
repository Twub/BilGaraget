const sqlite3 = require("better-sqlite3");
const db = sqlite3("../forum.db");
const Encrypt = require('./Security/Encrypt')

const register = async (req, res) =>{
  if(req.body.password){
    req.body.password = Encrypt.multiEncrypt(req.body.password)
  }
let statement = db.prepare(/*sql*/`
INSERT INTO users (email, username, password, roleId) values ($email, $username, $password, $roleId)`)
res.json(statement.run(req.body))
}

const login = async (req, res) =>{
   if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }
      let statement = db.prepare(/*sql*/`
         SELECT u.id, u.email, u.username, r.userRole FROM users as u, roles as r
         WHERE u.email = $email AND u.password = $password AND r.id = u.roleId
      `);
      let user = await statement.get(req.body) || null;
      if (user) {
        delete user.password;
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