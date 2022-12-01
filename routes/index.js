const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'List Users' });
});

/* GET home page. */
router.get('/login', (req, res, next) => {
  res.render('signin', { title: 'Login User' });
});

/* GET home page. */
router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Signup User' });
});

module.exports = router;
