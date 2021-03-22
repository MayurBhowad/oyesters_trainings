const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const keys = require('../config/keys.config');

//Model
const User = require('../models/user.model');

//@route    GET api/auth/test
//@desc     Test auth rout
//@access   Public
router.get('/test', (req, res) => {
    res.send('Hello from auth route, Test passed!')
})

//@route    POST api/auth/register
//@desc     register user
//access    public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ message: 'Email Already Existed!' })
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.status(200).json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    })
})

//@route    POST api/auth/login
//@desc     login user
//access    public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(400).json({ message: 'User Not Found!' })
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, username: user.username, email: user.email }

                jwt.sign(payload, keys.SECRETE, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                })
            } else {
                return res.status(400).json({ message: 'Password Incorrect!' })
            }
        })
    })
})

module.exports = router;