// Load the 'index' controller
const comments = require('../controllers/comments.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.route('/commentsByStudent').get(comments.commentsByStudent);
    app.route('/commentPost').post(comments.save);
    app.route('/comments').get(comments.renderComment);
};