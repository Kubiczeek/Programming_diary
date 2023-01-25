const express = require("express");
const {
  SessionLog,
  Programmer,
  Category,
  loadJSON,
  saveJSON,
} = require("./public/js/FileSystem");
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

app.get("/", (req, res) => {
  const Objects = loadJSON("data.json");
  const Programmers = loadJSON("programmers.json");
  const Categories = loadJSON("categories.json");
  res.render("pages/index", {
    Objects: Objects,
    Programmers: Programmers,
    Categories: Categories,
  });
});

app.post("/add", (req, res) => {
  const body = req.body;
  const sessionLog = new SessionLog(
    Date.now(),
    body.date,
    body.timespent,
    body.rating,
    body.language,
    body.description,
    body.programmer,
    body.category
  );
  const currentJson = loadJSON("data.json");
  currentJson.push(sessionLog);
  saveJSON("data.json", currentJson);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const currentJson = loadJSON("data.json");
  for (let i = 0; i < currentJson.length; i++) {
    if (currentJson[i].id == req.body.id) {
      currentJson.splice(i, 1);
      saveJSON("data.json", currentJson);
      return;
    }
  }
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const currentJson = loadJSON("data.json");
  //delete
  for (let i = 0; i < currentJson.length; i++) {
    if (currentJson[i].id == req.body.id) {
      currentJson.splice(i, 1);
      saveJSON("data.json", currentJson);
      return;
    }
  }
  //adding
  const body = req.body;
  const sessionLog = new SessionLog(
    Date.now(),
    body.date,
    body.timespent,
    body.rating,
    body.language,
    body.description,
    body.programmer,
    body.category
  );
  currentJson.push(sessionLog);
  saveJSON("data.json", currentJson);
  res.redirect("/");
});

app.post("/programmer", (req, res) => {
  const body = req.body;
  const jsonFile = loadJSON("programmers.json");
  const currentJson = loadJSON("data.json");
  switch (body.action) {
    case "add":
      const programmerA = new Programmer(body.name);
      jsonFile.push(programmerA);
      saveJSON("programmers.json", jsonFile);
      break;
    case "edit":
      for (let item of jsonFile) {
        if (item.name == body.programmer) {
          item.name = body.name;
        }
      }
      for (const card of currentJson) {
        if (card.programmer == body.programmer) {
          card.programmer = body.name;
        }
      }
      saveJSON("programmers.json", jsonFile);
      saveJSON("data.json", currentJson);
      break;
    case "delete":
      let array = [];
      for (let i = 0; i < jsonFile.length; i++) {
        if (jsonFile[i].name == body.programmer) {
          jsonFile.splice(i, 1);
        }
      }
      for (let i = 0; i < currentJson.length; i++) {
        if (currentJson[i].programmer == body.programmer) {
          array.push(i);
        }
      }
      array.reverse();
      for (let i = 0; i < array.length; i++) {
        currentJson.splice(array[i], 1);
      }
      saveJSON("programmers.json", jsonFile);
      saveJSON("data.json", currentJson);
      break;
  }
  res.redirect("/");
});

app.post("/category", (req, res) => {
  const body = req.body;
  const jsonFile = loadJSON("categories.json");
  const currentJson = loadJSON("data.json");
  switch (body.action) {
    case "add":
      const category = new Category(body.name, body.color, body.description);
      jsonFile.push(category);
      break;
    case "edit":
      for (let item of jsonFile) {
        if (item.name == body.category) {
          item.name = body.name;
          item.color = body.color;
          item.description = body.description;
        }
      }
      for (const card of currentJson) {
        if (card.category == body.category) {
          card.category = body.name;
        }
      }
      break;
    case "delete":
      for (let i = 0; i < jsonFile.length; i++) {
        if (jsonFile[i].name == body.category) {
          jsonFile.splice(i, 1);
        }
      }
      for (let i = 0; i < currentJson.length; i++) {
        if (currentJson[i].category == body.category) {
          currentJson[i].category = "";
        }
      }
      break;
  }
  saveJSON("categories.json", jsonFile);
  saveJSON("data.json", currentJson);
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port} \n(Port: ${port})`)
);
