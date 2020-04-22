// const bcrypt = require('bcryptjs'); // NO LONGER NEED THIS

const jwt = require('jsonwebtoken');// insteall instead of bcrypt
const { jwtSecret } = require('../config/secrets');

// const Users = require('../users/users-model.js'); // NO LONGER NEED THIS AS WE ARE NOT TOUCHING Database

module.exports = (req, res, next) => {
  // const { username, password } = req.headers; // change to
  const { authorization } = req.headers;

  // const secret = process.env.JWT_SECRET || 'it is a secret' // dump this and just put destructure jwtSecret below
  if (authorization) { // changes to auth from name and pass

    // Users.findBy({ username })
    //   .first()
    // .then(user => {

    jwt.verify(authorization, jwtSecret, (err, decodedToken) => {

      if (err) { // before it was (user && bcrypt.compareSync(password, user.password))
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.decodedToken = decodedToken; // should match what's in middleware

        next();
      }
    })
    // })
    // .catch(error => {
    //   res.status(500).json({ message: 'Ran into an unexpected error' });
    // });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};


