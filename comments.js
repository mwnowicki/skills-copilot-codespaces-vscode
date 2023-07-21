// Create web server using express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Use cors
app.use(cors());

// Use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Create mongoose schema
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    name: String,
    email: String,
    comment: String
});
const CommentModel = mongoose.model('comment', commentSchema);

// Create web server
app.post('/api/comments', (req, res) => {
    const data = req.body;
    const newComment = new CommentModel(data);
    newComment.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            res.json({
                msg: 'Your data has been saved'
            });
        }
    });
});

app.get('/api/comments', (req, res) => {
    CommentModel.find({}, (error, data) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            res.json(data);
        }
    });
});

// Set port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));