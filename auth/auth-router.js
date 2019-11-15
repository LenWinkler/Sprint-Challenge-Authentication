const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');



router.post('/register', (req, res) => {
  let user = req.body;

  if (!user.username || !user.password) {
    res.status(400).json({ message: "Please provide a username and password" })
  } else {

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user);

        res.status(200).json({
          message: "Logged in successfully!",
          token
        })
      } else {
        res.status(400).json({ message: "Invalid credentials" })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

function getJwtToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  }

  const secret = process.env.JWT_SECRET || 'keep it secret';

  const options = {
    expiresIn: '1hr'
  };

  return jwt.sign(payload, secret, options)

}

module.exports = router;
