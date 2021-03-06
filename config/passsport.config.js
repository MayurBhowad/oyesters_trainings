const JwtStratagy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const keys = require('./keys.config');
const User = require('../models/user.model');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.SECRETE;

module.exports = passport => {
    passport.use(new JwtStratagy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false)
        }).catch(err => console.log(err));
    }))
}