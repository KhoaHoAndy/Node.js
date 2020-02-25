const Comment = require('mongoose').model('Comment');

exports.commentsByStudent = function (req, res, next) {
    console.log(req.session.studentId);
    var id = req.session.studentId;
    console.log(id);

    Comment.find({
        student: id
    }, (err, comments) => {
        if (err) { return getErrorMessage(err); }
        console.log(comments);
        res.render('listofcomments', { comments: comments });
    });

};
exports.save = function (req, res) {
    const comment = new Comment();
    comment.courseCode = req.body.courseCode;
    console.log(req.body.courseCode);

    comment.courseName = req.body.courseName;
    console.log(req.body.courseName);

    comment.program = req.body.program;
    console.log(req.body.program);

    comment.semester = req.body.semester;
    console.log(req.body.semester);

    comment.date = req.body.date;
    console.log(req.body.courseCode);

    comment.comment = req.body.comment;
    console.log(req.body.comment);

    var studentId = req.session.student._id;
    comment.student = req.session.student._id;
    console.log(req.session.student._id);


    // Use the 'Student' instance's 'save' method to save a new student document
    comment.save((err) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            var session = req.session;
            session.studentId = studentId;
            res.render('index');
        }
    });
};
exports.renderComment = function (req, res) {
    res.render('comments', { title: 'comment' });
}