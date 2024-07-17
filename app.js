const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    let { username, password } = req.body;
    let user = await userModel.findOne({ username });

    if (!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: user.email, userid: user._id }, "shhhhhh");
            res.cookie("token", token);
            res.status(200).redirect('/profile');
        } else {
            res.redirect("/login");
        }
    });
});

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts");
    res.render('profile', { user });
});

app.post("/post", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts");
    let { content } = req.body;

    if (!content) {
        return res.status(400).send("Content is required");
    }

    let post = await postModel.create({
        user: user._id,
        content: content
    });

    console.log(post.content);

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

app.post('/register', async (req, res) => {
    let { email, password, username, name, age } = req.body;
    let user = await userModel.findOne({ email });

    if (user) return res.status(500).send("User Already Registered!");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            });

            let token = jwt.sign({ email: email, userid: user._id }, "shhhhhh");
            res.cookie("token", token);
            res.redirect("/login");
        });
    });
});

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect('/login');
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findById(req.params.id);

    if (post.likes.includes(req.user.userid)) {
        post.likes = post.likes.filter(like => like.toString() !== req.user.userid);
    } else {
        post.likes.push(req.user.userid);
    }

    await post.save();
    res.redirect("/profile");
});

app.get("/likef/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findById(req.params.id);

    if (post.likes.includes(req.user.userid)) {
        post.likes = post.likes.filter(like => like.toString() !== req.user.userid);
    } else {
        post.likes.push(req.user.userid);
    }

    await post.save();
    res.redirect("/read");
});

app.get("/read", isLoggedIn, async (req, res) => {
    let user = await userModel.findById(req.user.userid).populate("posts");
    let posts = await postModel.find().populate("user");
    res.render('read', { user, posts });
});


function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
        return res.send("You must be logged in");
    }
    try {
        let data = jwt.verify(req.cookies.token, "shhhhhh");
        req.user = data;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.status(401).send("Invalid token, please login again");
    }
}


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
