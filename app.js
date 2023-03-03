const express = require("express");
var session = require("express-session");
const fs = require("fs");
const {
  SessionLog,
  Tag,
  User,
  loadJSON,
  saveJSON,
  convertJsonToCsv,
  convertCsvToJson,
} = require("./public/js/FileSystem.js");
const app = express();
const multer = require("multer");
const upload = multer();
const port = 80;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "A big cat",
    token: null,
    userId: null,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.set("views", "./views");
app.set("view engine", "ejs");
app.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.Password;
  const data = loadJSON("../json/records.json");
  const data2 = loadJSON("../json/tags.json");

  const LoginData = loadJSON("../json/users.json");
  var remember = req.body.remember;
  if (remember == "on") {
    remember = true;
  } else {
    remember = false;
  }
  const ClientID = req.session.token;
  const ghost = req.body.ghost;
  const userId = req.session.userId;

  let logged = false;
  for (login of LoginData) {
    for (save of login.saved_Devices) {
      if (save == ClientID && login.id == userId) {
        logged = true;
      }
    }
    if (logged) {
      break;
    }
    if (
      (login.username == name || login.email == name) &&
      login.password == password
    ) {
      logged = true;
      login["saved_Devices"].push(ghost);
      saveJSON("../json/users.json", LoginData);
      req.session.token = ghost;
      req.session.userId = login.id;
    }
  }

  if (logged == true) {
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

app.get("/", (req, res) => {
  const data = loadJSON("../json/records.json");
  const data2 = loadJSON("../json/tags.json");
  const LoginData = loadJSON("../json/users.json");
  let logged = false;
  let admin = false;
  let name = "";
  let userId = req.session.userId;
  for (login of LoginData) {
    for (save of login.saved_Devices) {
      if (save == req.session.token && login.id == userId) {
        logged = true;
        name = login.name;
        if (login.admin == true) {
          admin = true;
        }
        break;
      }
    }
  }
  if (logged) {
    const userRecords = [];
    data.forEach((record) => {
      if (userId == record.userId) {
        userRecords.push(record);
      }
    });
    res.render("pages/index", {
      records: userRecords,
      tags: data2,
      programmers: LoginData,
      name: name,
      admin: admin,
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/admin", (req, res) => {
  const data = loadJSON("../json/tags.json");
  const data2 = loadJSON("../json/users.json");
  const LoginData = loadJSON("../json/users.json");
  let logged = false;
  let userId = req.session.userId;
  for (login of LoginData) {
    for (save of login.saved_Devices) {
      if (
        save == req.session.token &&
        login.id == userId &&
        login.admin == true
      ) {
        logged = true;
      }
    }
  }
  if (logged == true) {
    res.render("pages/admin", {
      tags: data,
      users: data2,
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.get("/logout", (req, res) => {
  req.session.token = "5";
  req.session.userId = "-1";
  res.redirect("/login");
});

app.get("/exportRecord", (req, res) => {
  const data = loadJSON("../json/records.json");
  const data2 = loadJSON("../json/users.json");
  const ClientID = req.session.token;
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  let username = "";
  data2.forEach((user) => {
    if (
      user.saved_Devices.includes(ClientID) &&
      user.id == req.session.userId
    ) {
      username = user.username;
    }
  });
  let userRecords = [];
  data.forEach((record) => {
    if (req.session.userId == record.userId) {
      delete record.category;
      userRecords.push(record);
    }
  });
  const fileName = `${username}-${formattedDate}.csv`;
  if (userRecords.length == 0 || userRecords == undefined) {
    fs.writeFile(fileName, "", (err) => {
      if (err) throw err;
      res.download(fileName, fileName, (err) => {
        if (err) throw err;
        fs.unlinkSync(fileName);
      });
    });
  } else {
    fs.writeFile(fileName, convertJsonToCsv(userRecords), (err) => {
      if (err) throw err;
      res.download(fileName, fileName, (err) => {
        if (err) throw err;
        fs.unlinkSync(fileName);
      });
    });
  }
});

app.post("/upload-json", upload.single("file"), (req, res) => {
  const records = loadJSON("../json/records.json");
  const data2 = loadJSON("../json/users.json");
  const fileBuffer = req.file.buffer;
  const fileString = fileBuffer.toString("utf-8");
  const data = convertCsvToJson(fileString);
  const originalFileName = req.file.originalname;
  const actualData = JSON.parse(data);
  let username = "";
  data2.forEach((user) => {
    if (
      user.saved_Devices.includes(req.session.token) &&
      user.id == req.session.userId
    ) {
      username = user.username;
    }
  });
  if (username == originalFileName.split("-")[0]) {
    actualData.forEach((record) => {
      if (
        req.session.userId == record.userId &&
        record.hasOwnProperty("id") &&
        record.hasOwnProperty("date") &&
        record.hasOwnProperty("time_spent") &&
        record.hasOwnProperty("rating") &&
        record.hasOwnProperty("programming_language") &&
        record.hasOwnProperty("description")
      ) {
        record.category = [null];
        records.push(record);
      }
    });
  }
  saveJSON("../json/records.json", records);
  res.send("File uploaded successfully.");
});

app.post("/addRecord", (req, res) => {
  const body = req.body;
  const data = loadJSON("../json/records.json");
  const LoginData = loadJSON("../json/users.json");
  let userId = req.session.userId;
  const sessionLog = new SessionLog(
    Date.now().toString(),
    body.date,
    body.timespent,
    body.rating,
    body.language,
    body.description,
    userId,
    Array.isArray(body.category) ? body.category : [body.category]
  );
  data.push(sessionLog);
  saveJSON("../json/records.json", data);
  res.redirect("/");
});

app.post("/deleteRecord", (req, res) => {
  const currentJson = loadJSON("../json/records.json");
  for (let i = 0; i < currentJson.length; i++) {
    if (currentJson[i].id == req.body.id) {
      currentJson.splice(i, 1);
      saveJSON("../json/records.json", currentJson);
      return;
    }
  }
  res.redirect("/");
});

app.post("/editRecord", (req, res) => {
  const currentJson = loadJSON("../json/records.json");
  const body = req.body;
  currentJson.forEach((jsonObject) => {
    if (jsonObject.id == body.id) {
      jsonObject.date = body.date;
      jsonObject.timespent = body.timespent;
      jsonObject.rating = body.rating;
      jsonObject.language = body.language;
      jsonObject.description = body.description;
      jsonObject.category = Array.isArray(body.category)
        ? body.category
        : [body.category];
    }
  });
  saveJSON("../json/records.json", currentJson);
  res.redirect("/");
});

app.post("/admin/addUser", (req, res) => {
  const body = req.body;
  const currentJson = loadJSON("../json/users.json");
  const user = new User(
    Date.now().toString(),
    body.adminYes == "false" ? true : false,
    body.username,
    body.surname,
    body.fName,
    body.email,
    body.password
  );
  currentJson.push(user);
  saveJSON("../json/users.json", currentJson);
  res.redirect("/admin");
});

app.post("/admin/editUser", (req, res) => {
  const body = req.body;
  const currentJson = loadJSON("../json/users.json");
  currentJson.forEach((user) => {
    if (user.id == body.id) {
      user.admin = body.adminYes;
      user.username = body.username;
      user.surname = body.surname;
      user.name = body.fName;
      user.email = body.email;
      user.password = body.password;
    }
  });
  saveJSON("../json/users.json", currentJson);
  res.redirect("/admin");
});

app.post("/admin/deleteUser", (req, res) => {
  const body = req.body;
  const currentJson = loadJSON("../json/users.json");
  const filtered = currentJson.filter((user) => user.id != body.id);
  saveJSON("../json/users.json", filtered);
  res.redirect("/admin");
});

app.post("/admin/addTag", (req, res) => {
  const body = req.body;
  const currentJson = loadJSON("../json/tags.json");
  const tag = new Tag(
    Date.now().toString(),
    body.name,
    body.color,
    body.description
  );
  currentJson.push(tag);
  saveJSON("../json/tags.json", currentJson);
  res.redirect("/admin");
});

app.post("/admin/editTag", (req, res) => {
  const body = req.body;
  const currentJson = loadJSON("../json/tags.json");
  currentJson.forEach((tag) => {
    if (tag.id == body.id) {
      tag.name = body.name;
      tag.color = body.color;
      tag.description = body.description;
    }
  });
  saveJSON("../json/tags.json", currentJson);
  res.redirect("/admin");
});

app.post("/admin/deleteTag", (req, res) => {
  const body = req.body;
  const currentJson = loadJSON("../json/tags.json");
  const filtered = currentJson.filter((tag) => tag.id != body.id);
  saveJSON("../json/tags.json", filtered);
  res.redirect("/admin");
});

app.delete("/users/:Uid/records/:Rid", (req, res) => {
  const id = req.params;
  const currentJson = loadJSON("../json/records.json");
  for (let i = 0; i < currentJson.length; i++) {
    if (currentJson[i].id == id.Rid) {
      currentJson.splice(i, 1);
      res.status(200).send();
      saveJSON("../json/records.json", currentJson);
      return;
    }
  }

  res.status(404).send();
});
app.get("/users/:Uid/records/:Rid", (req, res) => {
  const id = req.params;

  const currentJson = loadJSON("../json/records.json");
  for (let i = 0; i < currentJson.length; i++) {
    if (currentJson[i].id == id.Rid) {
      res.send(currentJson[i]);

      return;
    }
  }
  res.status(404).send();
});
app.get("/users/:Uid/records/", (req, res) => {
  const id = req.params;
  var Complete = [];
  const currentJson = loadJSON("../json/records.json");
  for (let i = 0; i < currentJson.length; i++) {
    if (currentJson[i].userId == id.Uid) {
      Complete.push(currentJson[i]);
    }
  }
  res.send(Complete);
  res.status(404).send();
});
app.put("/users/:Uid/records/:Rid", (req, res) => {
  const id = req.params;

  const currentJson = loadJSON("../json/records.json");

  sessionLog = req.body;
  currentJson.forEach((jsonObject) => {
    if (jsonObject.id == req.body.id) {
      jsonObject.date = req.body.date;
      jsonObject.userId = id.Uid;

      jsonObject.timespent = req.body.timespent;
      jsonObject.rating = req.body.rating;
      jsonObject.language = req.body.language;
      jsonObject.description = req.body.description;
      jsonObject.programmer = req.body.programmer;
      jsonObject.category = Array.isArray(req.body.category)
        ? req.body.category
        : [req.body.category];
    }
  });
  saveJSON("../json/records.json", currentJson);
  res.status(200).send();
});
app.post("/users/:Uid/records/", (req, res) => {
  const id = req.params;
  const currentJson = loadJSON("../json/records.json");
  req.body.userId = id.Uid;
  currentJson.push(req.body);
  saveJSON("../json/records.json", currentJson);
  res.send(req.body);
});
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port} \n(Port: ${port})`)
);
