const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const restricted = require('../auth/restricted-middleware')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, checkRole('user'), usersRouter); // adding restricted here ensures person is logged in before seeing users, remove restricted from user-router
// adding in checkRole('hr) function to identify which team can see something
function checkRole(role) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.role &&
      req.decodedToken.role.toLowerCase() === role) {
      next()
    } else {
      res.status(403).json({ message: "shall not pass" })
    }
  }
}

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
