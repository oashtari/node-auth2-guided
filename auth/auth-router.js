const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // bring in npm package

const Users = require('../users/users-model.js');
const { jwtSecret } = require('../config/secrets');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token // sending the token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// function to be used above, it is generating the token
function generateToken(user) {
  const payload = {
    username: user.username,
    role: user.role || 'user'
  }
  // const secret = process.env.JWT_SECRET || 'it is a secret' // dump and insert directly below

  const options = {
    expiresIn: '1h',

  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;


// things to throw into a catch instead of just 'err' -> ({name, code, message, stack}) 
// useful for debugging what is actually in the error occuring
