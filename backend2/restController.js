const sqlite3 = require("better-sqlite3");
const db = sqlite3("../forum.db");
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

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

const getThreadsByCategory = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
   SELECT threads.* FROM threads, categories WHERE threads.cateogryId = $categoryId AND categories.id = $categoryId
   `);

  res.json(statement.all({ categoryId: req.params.categoryId }));
};

const getReplies = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
   SELECT replies.* FROM replies, threads WHERE replies.threadId = $threadId AND threads.id = $threadId `);

  res.json(statement.all({ threadId: req.params.threadId }));
};

const getUser = async(req, res) =>{
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
}
const createThread = async (req, res) => {
  const permission = ac.can(req.session.user.userRole).createOwn("thread");
  if (permission.granted) {
    let statement = db.prepare(/*sql*/ `
   INSERT into threads (title, cateogryId, creator, threadInfo) VALUES ($title, $categoryId, $creator, $threadInfo)`);
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
};
const createReply = async (req, res) => {
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
};

const getAllModeratedThreads = async (req, res) =>{
  console.log(req.params.userId);
  let query = `SELECT t.* FROM threadsXmoderator as tXm, threads as t WHERE tXm.userId = ${req.params.userId} AND tXm.threadId = t.id`;
  let statement = db.prepare(query)
  let chosen = statement.all()  
  res.json(chosen);
}


const isModerator = async (threadId, userId) => {
  let statement = db.prepare(/*sql*/ `
  SELECT * FROM threadsXmoderator WHERE threadId = $threadId AND userId = $userId`);
  let result = statement.all({threadId: threadId, userId: userId})
  return false;
}

const setAsModerator = async (req, res) => {
   const permission = ac
     .can(req.session.user.userRole)
     .updateAny("userOrModerator");
     if(permission.granted){
       let check = isModerator(req.params.threadId, req.params.userId)
       let statement = db.prepare(/*sql*/ `
       INSERT into threadsXmoderator (threadId, userId) VALUES ($threadId, $userId) `)
       res.json(statement.run({threadId: req.params.threadId, userId: req.params.userId}));
       }
     }


const removeAsModerator = async (req, res) => {
  console.log(req.session.user);
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
}

const disableThread = async (req, res) =>{
  let statement = db.prepare(/*sql*/`
  UPDATE threads SET locked = 1 WHERE id = $threadId`)
  res.json(statement.run({threadId : req.params.threadId}))
}
const deleteReply = async (req, res) =>{
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
}


module.exports = {
  getThreadsByCategory,
  getReplies,
  getUser,
  getAllModeratedThreads,
  createThread,
  createReply,
  setAsModerator,
  removeAsModerator,
  disableThread,
  deleteReply,
};
