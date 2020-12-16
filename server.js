// including packages
const express=require("express");
const app=express();
const method_override=require("method-override");
const mongoose=require("mongoose");
const ejs=require("ejs");
const express_sanitizer=require("express-sanitizer");
const body_parser=require("body-parser");

// confuguring dependencies
app.set("view engine","ejs");
app.use(body_parser.urlencoded({ extended: true }));
app.use(express_sanitizer());
app.use(express.static("public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
app.use(method_override("_method"));
const db_url = process.env.database_url || "mongodb://localhost/blog_rest_api"
mongoose.connect(db_url);


//blog schema
const blog_schema=new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://images.unsplash.com/photo-1525784451128-d1488f52f03e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"},
    body: String,
    date: {type: Date, default: Date.now}
});
const blog=mongoose.model("blog",blog_schema);


// root route
app.get("/",function(req,res){
    res.redirect("/blogs");
});

// Index Route
app.get("/blogs",function(req,res){
    blog.find({},function(error,blog){
        if (error)
        {
            console.log("error encountered while searching for blogs");
            console.log(error);
        }
        else
        {
            console.log("blog database searched successfully");
            res.render("index",{blog:blog});
        }
    });
});

// New Route
app.get("/blogs/new", function(req,res){
    res.render("new");
});

// create route
app.post("/blogs", function(req,res){
    req.body.blog.title=req.sanitize(req.body.blog.title);
    req.body.blog.image=req.sanitize(req.body.blog.image);
    req.body.blog.body=req.sanitize(req.body.blog.body);
    blog.create(req.body.blog, function(error,blog)
    {
        if (error)
        {
            console.log("error encountered while adding a blog in the database");
            console.log(error);
            res.render("new");
        }
        else
        {
            console.log("blog added succcessfully in the database");
            res.redirect("/blogs");
        }
    })
})

// show route
app.get("/blogs/:id", function(req,res){
    blog.findById(req.params.id, function(error,found_blog)
    {
        if (error)
        {
            console.log("error encountered while showing webpage for indivisual blog with id- " + req.params.id);
            console.log(error);
        }
        else
        {
            console.log("webpage for indivisual blog displed of id- " + req.params.id);
            res.render("show",{blog: found_blog});
        }
    });
});

// edit route
app.get("/blogs/:id/edit", function(req,res){
    blog.findById(req.params.id, function(error,blog_found)
    {
        if (error)
        {
            console.log("error encountered while displaying edit for for id- " +  id);
            console.log(error);
            res.redirect("/blogs");
        }
        else
        {
            res.render("edit",{blog:blog_found});
        }
    });
});

// update route
app.put("/blogs/:id", function(req,res){
    req.body.blog.title=req.sanitize(req.body.blog.title);
    req.body.blog.image=req.sanitize(req.body.blog.image);
    req.body.blog.body=req.sanitize(req.body.blog.body);
    blog.findByIdAndUpdate(req.params.id,req.body.blog, function(error, updated_blog){
        if (error)
        {
            console.log("error encountered while searching and updating blog");
            console.log(error);
            res.redirect("/blogs");
        }
        else
        {
            console.log("blog searched and updated sucessfully");
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

// destroy route
app.delete("/blogs/:id", function(req,res){
    blog.findByIdAndRemove(req.params.id, function(error)
    {
        if (error)
        {
            console.log("Error encountered while deleting the blog. Unable to delete the blog post");
            res.render("/blogs/" + req.body.id);
        }
        else
        {
            console.log("blog post deleted successfully");
            res.redirect("/blogs");
        }
    });
});

const port=process.env.PORT || 8000;
app.listen(port, process.env.IP, function(){
    console.log("The blog_restful_api server have started at port " +  port);
})
