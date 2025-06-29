const express = require('express')
const { signup, login, update, profile, search } = require('./user.service')

const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.patch('/update/:id', update)

router.get('/profile/:id', profile);

router.get('/search', search);

module.exports = router;