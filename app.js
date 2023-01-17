const express = require("express");
const { SessionLog, loadJSON, saveJSON } = require("./public/js/FileSystem");
const app = express();
const port = process.env.PORT || 8080;

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
  res.render("pages/index", { Objects: Objects });
});

app.post("/add", (req, res) => {
  const body = req.body;
  const sessionLog = new SessionLog(
    Date.now(),
    body.date,
    body.timespent,
    body.rating,
    body.language,
    body.description
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
    body.description
  );
  currentJson.push(sessionLog);
  saveJSON("data.json", currentJson);
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port} \n(Port: ${port})`)
);
