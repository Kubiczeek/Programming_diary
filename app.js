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
  res.render("index");
});

app.post("/", (req, res) => {
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

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port} \n(Port: ${port})`)
);
