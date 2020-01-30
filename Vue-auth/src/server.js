

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('./config');
const DB = require('./db');

const db = new DB('sqlitedb');
const server = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

server.use(allowCrossDomain);

router.post('/register', (req, res) => {
  db.insert([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8),
  ],
  // eslint-disable-next-line consistent-return
  (err) => {
    if (err) return res.status(500).send('There was a problem registering the user.');
    db.selectByEmail(req.body.email, (err, user) => {
      if (err) return res.status(500).send('There was a problem getting user');
      // eslint-disable-next-line max-len
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
        // eslint-disable-next-line object-curly-newline
      });
      res.status(200).send({ auth: true, token, user });
    });
  });
});
router.post('/register-admin', (req, res) => {
  db.insertAdmin([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8),
    1,
  ],
  // eslint-disable-next-line consistent-return
  (err) => {
    if (err) return res.status(500).send('There was a problem registering the user.');
    // eslint-disable-next-line consistent-return
    db.selectByEmail(req.body.email, (err, user) => {
      if (err) return res.status(500).send('There was a problem getting user');
      // eslint-disable-next-line max-len
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
        // eslint-disable-next-line object-curly-newline
      });
      res.status(200).send({ auth: true, token, user });
    });
  });
});

router.post('/login', (req, res) => {
  // eslint-disable-next-line consistent-return
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    // eslint-disable-next-line max-len
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
      // eslint-disable-next-line object-curly-newline
    });
    res.status(200).send({ auth: true, token, user });
  });
});
server.use(router);

const port = process.env.PORT || 8080 ;

// eslint-disable-next-line no-unused-vars
const server = server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
