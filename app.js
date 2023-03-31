const express = require("express");
const fs = require("fs");
const { loadJSON, saveJSON } = require("./public/js/FileSystem.js")
const app = express();
const port = 80;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.set("views", "./views");
app.set("view engine", "ejs");
app.get("/home", )



app.get("/", (req, res) => {
  const notes = loadJSON("../json/data.json");
  res.render("pages/index", {notes: notes});
});

app.get("/statistics", (req, res) => {
  res.render("pages/statistics");
});

app.post("/addNote", (req, res) => {
  var body = req.body;
  console.log(body);
  const notes = loadJSON("../json/data.json");
  var note = {
    id: Date.now().toString(),
    text: body.text,
    author: body.author,
    color: body.color,
  };
  notes.unshift(note);
  saveJSON("../json/data.json", notes);

  res.redirect("/");
});

app.post("/editNote", (req, res) => {
  const body = req.body;
  const id = body.id;
  const notes = loadJSON("../json/data.json");
  notes.forEach((element) => {
    console.log(body);
    if (element.id==id) {
      console.log(body.text);
      element.text = body.text;
      element.author = body.author;
      element.color = body.color;
    }
  });
  saveJSON("../json/data.json", notes);
  res.redirect("/");
})  

app.post("/deleteNote", (req, res) => {
  const body = req.body;
  const id = body.id;
  const notes = loadJSON("../json/data.json");
  const filter = notes.filter(word => word.id != id);
  saveJSON("../json/data.json", filter);
  res.redirect("/");
})

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port} \n(Port: ${port})`)
);