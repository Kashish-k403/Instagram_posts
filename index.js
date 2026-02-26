const express = require("express");
const app = express();
const port = 8080;
const path= require("path");
const methodOverride = require("method-override");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });


const {v4 : uuidv4} = require("uuid");
uuidv4();

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
    id : uuidv4(),
    username: "_katrina",
    name: "Katrina Kaif",
    likes: 500,
    comments: 160,
    image: "kat.jpeg",
    bio: "Less perfection, more authenticity"

},
{
    id : uuidv4(),
    username: "_deepik44",
    name: "Deepika Padukone",
    likes: 200,
    comments: 50,
    image: "deepiika.jpeg",
    bio: "Finding beauty in the simple things."
},
{
    id : uuidv4(),
    username: "_sallu",
    name: "Salman Khan",
    likes: 700,
    comments: 240,
    image: "sallu.jpeg",
    bio: "Collecting moments, not things."
},
{
    id : uuidv4(),
    username: "__aish__",
    name: "Aishwarya Rai",
    likes: 150,
    comments: 22,
    image: "aish.jpeg",
    bio: "Happiness is homemade."
},
{
    id : uuidv4(),
    username: "_shrdda_",
    name: "Shradhha Kapoor",
    likes: 5500,
    comments: 353,
    image: "shradhha.jpeg",
    bio: "Living for the moments that take your breath away."
},
{
    id : uuidv4(),
    username: "alia_",
    name: "Alia Bhatt",
    likes: 300,
    comments: 177,
    image: "alia.jpeg",
    bio: "Sunsets and good vibes."
},
{
    id : uuidv4(),
    username: "_shah_rukh",
    name: "Shahrukh Khan",
    likes: 10,
    comments: 2,
    image: "shah.jpeg",
    bio: "Adventure awaits around every corner."
},
{
    id : uuidv4(),
    username: "hritik11",
    name: "Hritik Roshan",
    likes: 5000,
    comments: 2400,
    image: "hritik.jpeg",
    bio: "Chasing dreams and making memories."
},
{
    id : uuidv4(),
    username: "kareena__",
    name: "Kareena Kapoor",
    likes: 530,
    comments: 332,
    image: "kareena.jpeg",
    bio: "Life's too short not to smile."
}

]
app.get("/", (req, res) => {
    res.send("Server is working");

})


app.get("/posts", (req, res)=> {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})
app.post("/posts",upload.single("image"), (req, res) => {
    let id  = uuidv4();
    let { username, name, password, bio} = req.body;
    let image = req.file.filename;
    console.log(req.body);
    console.log(req.file);
    posts.push({id, username,name,  password, bio, image});
    res.redirect("/posts");
})


app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post= posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", { post });
})

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newBio = req.body.bio;
    let post= posts.find((p) => id === p.id);
    post.bio = newBio;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post= posts.find((p) => id === p.id);
    console.log(post);
    res.render("edit.ejs", { post });

})

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})



app.listen(port,(req, res) => {
    console.log(`App is listening on ${port}`);
})