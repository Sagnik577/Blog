//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const _=require("lodash");
const mongoose=require("mongoose");
const homeStartingContent = "This is a blog post created by me, Sagnik Datta  A.K.A. weedbro to unite the known weed fans who understands the immense peace and pleasure of this natural green herb to post their experiences here so that we can together spread the knowledge we have gained to the wide audience outside who are one way deprived of the ultimate cure to all the existing problems of life.All the bros and sis out there are kindly requested to share their experience of being high and share this blog to as many possible so that we can combinedly make the unawares aware about the magic.As I say, 'We are being given the chance and we should rightfully utilize it to spread the PEACE throughout'.";
const aboutContent = "This post is meant to spread awareness about the gifted natural herb namely weed or reefer or ganja or pot or whatever name you want to call it, to the general public who are unaware by going into '/compose' route and sharing your experience of this herb by posting it in this blog.This post would be accessible by all so everyone can read it and know about it....only you have to post your experience and then share this link to the maximum number of audience as much as you can.....so let's go!!";
const contactContent = "You can contact the members who have taken the initiative of this step in order to spread this awareness among all so that it can reach the government and we all can legally enjoy the stuff and get inspired to work to our best.";

const app = express();
let posts=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-ayan:"+process.env.PWD+"@ayans.pb3xa.mongodb.net/ComposeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const composeschema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
});





const Post = mongoose.model("posts", composeschema);



app.get("/", function (req, res) {
  Post.find({}, function (err, items) {
    if (!err) {
      posts = items;
    }
    else
    console.log(err);
    
  });
  res.render("home", { content: homeStartingContent, posts: posts });
  
});

app.get("/about",function(req,res){
  res.render("about",{content: aboutContent});
});

app.get("/compose",function(req,res){
 
  res.render("compose");

});
app.get("/contact", function(req,res){
  res.render("contact",{contactContent:contactContent});
});
app.get("/post/:custom",function(req,res){
  // for(var i=0;i<posts.length;i++){
  //   if(_.lowerCase(posts[i].postTitle)===_.lowerCase(req.params.post)){
  //     var body=posts[i].postContent;
  //     var title=posts[i].postTitle;
  //   }
  // }
  Post.findOne({title: _.upperFirst(req.params.custom)},function(err,post){
      var body = post.post;
      var title = post.title;
     res.render("post", { title: title, body: body });
  })
 
});

app.post("/compose",function(req,res){
  // post={
  //   postTitle: req.body.postTitle,
  //   postContent: req.body.postContent
  // };
  // posts.push(post);
   let post = new Post({
     title: req.body.postTitle,
     post: req.body.postContent,
   });
   Post.insertMany(post, function (err) {
     if (err) 
     console.log(err);
   });
   res.redirect("/");
   
});















app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
