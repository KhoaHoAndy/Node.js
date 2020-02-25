// Load the 'students' controller
const students = require('../controllers/students.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.route('/signup').post(students.create);
    app.route('/signup').get(students.renderSignup);
    app.route('/signin').post(students.signin);
    app.route('/signin').get(students.renderSignin);
    app.route('/allStudents').get(students.display);
}