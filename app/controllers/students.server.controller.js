// Load the 'Student' Mongoose model
const Student = require('mongoose').model('Student');

exports.renderSignin = function (req, res) {
    res.render('signin', { title: 'Sign in' });
};
exports.signin = function (req, res, next) {
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);

    Student.find({ email: email, password: password }, (err, student) => {
        if (err) { return next(err); }
        else if (!student || student === "") {
            console.log("no user found");
            res.render('signin', { title: "incorrect" });
        }
        else {
            console.log(student[0].firstName);
            var username = student;
            var session = req.session;
            session.student = student[0];
            session.username = username[0].firstName;
            res.render('comments', { title: 'Welcome' + session.username });
        }
    });
}

exports.renderSignup = function (req, res) {
    res.render('signup', { title: 'Add a student' });
}
// 'create' controller method to create a new student
exports.create = async function (req, res, next) {
    // Create a new instance of the 'Student' Mongoose model
    const student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.email = req.body.email;
    student.password = req.body.password;

    // Use the 'Student' instance's 'save' method to save a new student document
    await student.save((err) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response

            res.render('index');
        }
    });
};


// 'list' controller method to display all students in raw json format
exports.list = function (req, res, next) {
    // Use the 'Student' static 'find' method to retrieve the list of students
    Student.find({}, (err, students) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(students);
        }
    });
};

// 'display' controller method to display all students in friendly format
exports.display = function (req, res, next) {
    // Use the 'Student' static 'find' method to retrieve the list of students
    Student.find({}, (err, students) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('listofstudent', {
                title: 'List All Students',
                students: students
            });
        }
    });
};