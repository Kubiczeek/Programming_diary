const express = require("express");
const {
  SessionLog,
  Category,
  loadJSON,
  saveJSON,
} = require("./public/js/FileSystem.js");
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
  const data = loadJSON("../json/data.json");
  const data2 = loadJSON("../json/categories.json");
  const data3 = loadJSON("../json/programmers.json");
  res.render("pages/index", {
    data: data,
    categories: data2,
    programmers: data3,
  });
});

app.post("/addRecord", (req, res) => {
  const body = req.body;
  const data = loadJSON("../json/data.json");
  const sessionLog = new SessionLog(
    Date.now(),
    body.date,
    body.timespent,
    body.rating,
    body.language,
    body.description,
    body.programmer,
    Array.isArray(body.category) ? body.category : [body.category]
  );
  data.push(sessionLog);
  saveJSON("../json/data.json", data);
  res.redirect("/");
});

app.post("/deleteRecord", (req, res) => {
  const currentJson = loadJSON("../json/data.json");
  for (let i = 0; i < currentJson.length; i++) {
    if (currentJson[i].id == req.body.id) {
      currentJson.splice(i, 1);
      saveJSON("../json/data.json", currentJson);
      return;
    }
  }
  res.redirect("/");
});

app.post("/editRecord", (req, res) => {
  const currentJson = loadJSON("../json/data.json");
  const body = req.body;
  console.log(currentJson, body);
  currentJson.forEach((jsonObject) => {
    if (jsonObject.id == body.id) {
      jsonObject.date = body.date;
      jsonObject.timespent = body.timespent;
      jsonObject.rating = body.rating;
      jsonObject.language = body.language;
      jsonObject.description = body.description;
      jsonObject.programmer = body.programmer;
      jsonObject.category = Array.isArray(body.category)
        ? body.category
        : [body.category];
    }
  });
  saveJSON("../json/data.json", currentJson);
  res.redirect("/");
});

app.post("/programmer", (req, res) => {
  const currentJson = loadJSON("../json/data.json");
  const programmersJson = loadJSON("../json/programmers.json");
  const body = req.body;
  switch (body.settings) {
    case "Add":
      programmersJson.push(body.name);
      saveJSON("../json/programmers.json", programmersJson);
      break;
    case "Edit":
      currentJson.forEach((record) => {
        if (record.programmer === body.programmer)
          record.programmer = body.name;
      });
      const index = programmersJson.indexOf(body.programmer);
      if (~index) {
        programmersJson[index] = body.name;
      }
      saveJSON("../json/programmers.json", programmersJson);
      saveJSON("../json/data.json", currentJson);
      break;
    case "Delete":
      const newProgrammers = programmersJson.filter((programmer) => {
        return body.programmer !== programmer;
      });
      const newRecordsJson = currentJson.filter((record) => {
        return record.programmer !== body.programmer;
      });
      console.log(newRecordsJson, newProgrammers);
      saveJSON("../json/programmers.json", newProgrammers);
      saveJSON("../json/data.json", newRecordsJson);
      break;
  }
  res.redirect("/");
});

app.post("/category", (req, res) => {
  const currentJson = loadJSON("../json/data.json");
  const categoriesJson = loadJSON("../json/categories.json");
  const body = req.body;
  switch (body.settings) {
    case "Add":
      const category = new Category(body.name, body.color, body.description);
      categoriesJson.push(category);
      saveJSON("../json/categories.json", categoriesJson);
      break;
    case "Edit":
      for (let item of categoriesJson) {
        if (item.name == body.category) {
          item.name = body.name;
          item.color = body.color;
          item.description = body.description;
        }
      }
      for (const card of currentJson) {
        const filteredX = card.category.filter((category) => {
          return category !== body.category;
        });
        console.log(filteredX, card.category);
        if (JSON.stringify(filteredX) != JSON.stringify(card.category))
          filteredX.push(body.name);
        card.category = filteredX;
      }
      console.log(currentJson);
      saveJSON("../json/data.json", currentJson);
      saveJSON("../json/categories.json", categoriesJson);
      break;
    case "Delete":
      const newCategoryJson = categoriesJson.filter((category) => {
        return body.category !== category.name;
      });
      currentJson.forEach((jsonObject) => {
        const x = jsonObject.category.filter((category) => {
          return body.category !== category;
        });
        jsonObject.category = x;
      });
      saveJSON("../json/data.json", currentJson);
      saveJSON("../json/categories.json", newCategoryJson);
      break;
  }
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port} \n(Port: ${port})`)
);
