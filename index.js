const express = require("express");
const fs = require("fs");
const app = express();
const port = 1025;

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
    res.render("pages/index");
});

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port} \n(Port: ${port})`)
);