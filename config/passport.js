const LocalStrategy = require('passport-local').Strategy;
const Student = require('../model/student');
const config = require('../confoig/mongoose');
const bcrypt = require('bcryptjs');
module.exports = function (passport) {
    passport.use(new LocalStrategy(function (email, password, done) {
        let query = { email: email };
        Student.findOne(query, function (err, student) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'no student' });
            }
            bcrypt.compare(password, student.passport, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, student);
                } else {
                    return done(null, false, { message: 'Wrong password' })
                }
            });
        });
    }));
    passport.serializeStudent(function (student, done) {
        done(null, student.id);
    });

    passport.deserializeStudent(function (email, done) {
        Student.findById(id, function (err, student) {
            done(err, student);
        });
    });
}