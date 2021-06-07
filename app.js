//IMPORTING PACKAGES********************************************************
const express = require ("express");
const path = require("path");
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

//RUNNING PACKAGES*********************************************************
const app = express();
uuid();
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views" ));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

//FAKE DATABASE***********************************************************
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

//DISPLAYING ALL OF THE COMMENTS BY RENDERING INDEX.EJS PAGE**************
app.get("/comments", (req,res) => {
    res.render ("comments/index", {comments})
})

//CREATING A NEW COMMENT AND ADDING TO THE ARRAY**************************
app.get("/comments/new", (req,res) => {
    res.render("comments/new")
})

app.post("/comments", (req,res) => {
    const newComment = {
        username: req.body.username,
        comment:req.body.comment,
        id: uuid()
    }
    comments.push(newComment);
     
    res.redirect("/comments");
})

//DISPLAYING A SINGLE COMMENT**********************************************
app.get("/comments/:id", (req,res) => {
    const {id} =req.params;
    const commentShow = comments.find(c => c.id ===id);
    res.render("comments/show", {commentShow});
})

//EDITING A COMMENT*******************************************************
app.get("/comments/:id/edit", (req,res) => {
    const {id} =req.params;
    const commentShow = comments.find(c => c.id ===id);
    res.render("comments/edit", {commentShow});
})

app.patch("/comments/:id", (req,res) => {
    const {id} = req.params;
    const commentFound = comments.find(c => c.id === id);
    const commentUpdated =req.body.comment;
    commentFound.comment = commentUpdated;
    res.redirect("/comments");
})

//DELETING A COMMENT****************************************************
app.delete("/comments/:id", (req,res) => {
    const {id} =req.params;
    comments =comments.filter(c => c.id !== id);
    res.redirect("/comments")
})





//SETTING UP THE SERVER ON PORT 3000***********************************
app.listen(3000, () => {
    console.log("Server is awake on port 3000");
})