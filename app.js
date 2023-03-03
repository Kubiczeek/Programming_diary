const { json } = require("express");

const express = require("express");
var session = require('express-session')
const {
  SessionLog,
  Tag,
  User,
  loadJSON,
  saveJSON,
} = require("./public/js/FileSystem.js");
const app = express();
const multer = require("multer");
const upload = multer();
const port = 81;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "A big cat",token: null}))

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.set("views", "./views");
app.set("view engine", "ejs");
app.post("/main", (req, res) => {
  const name = req.body.name;
  const password = req.body.Password;
  const data = loadJSON("../json/records.json");
  const data2 = loadJSON("../json/tags.json");

  const LoginData = loadJSON("../json/users.json");
  var remember =req.body.remember;
if(remember == "on"){
  remember = true;
}else{
  remember = false;
}
 const ClientID =req.body.ghost;

  let logged = false;
  for (login of LoginData) {
    for(save of login.saved_Devices){
      if(save == ClientID){
        
        logged = true;
        req.session.token = ClientID;
        
      }
    }
    if(logged){break}
    if (login.username == name && login.password == password) {
      logged = true;
      login['saved_Devices'].push(ClientID)
      saveJSON("../json/users.json", LoginData);
    req.session.token = ClientID;

    }
    
  }

  if (logged == true) {
      res.render("pages/index", {
        records: data,
      tags: data2,
    });
  } else {  
    res.redirect("/login", {
      records: data,
    categories: data2,
  });
  }
});
app.get("/", (req, res) => {
  const data = loadJSON("../json/records.json");
  const data2 = loadJSON("../json/tags.json");
  const LoginData = loadJSON("../json/users.json");
  let logged = false;
  UserId = "";
  for (login of LoginData) {
    for(save of login.saved_Devices){
      if(save == req.session.token){
        logged= true
        UserId = login.id

      }
    }

    
  }
  if(logged){

  

    res.render("pages/index", {
      records: data,
      tags: data2,
      programmers: LoginData,
    });
  }else{
    res.redirect("/login", {
      data: data,
  
    });}
});

app.get("/admin", (req, res) => {
  const data = loadJSON("../json/tags.json");
  const data2 = loadJSON("../json/users.json");
  const LoginData = loadJSON("../json/users.json");

  ClientID= req.session.token 
var doIt = false

  LoginData.forEach((jsonObject) => {
    console.log( ClientID+" =?= "+jsonObject.saved_Devices)
    jsonObject.saved_Devices.forEach((saved)=> {
      if(jsonObject.admin == true){
        doIt = true
      }
    })

      
  });
if(doIt == true){
  res.render("pages/admin", {
    tags: data,
    users: data2,
  });
}else {
  res.redirect("/login");

 
}
});
app.get('/login',(req,res)=>{
  const data = loadJSON("../json/records.json");
  const data2 = loadJSON("../json/categories.json");
  const LoginData = loadJSON("../json/users.json");

  res.render('pages/login', {
  
    });

});
app.get("/logout", (req, res) => {
  const data = loadJSON("../json/records.json");
  const data2 = loadJSON("../json/categories.json");
  const LoginData = loadJSON("../json/users.json");


    req.session.token = "5"
    res.redirect("/login");
});
app.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.Password;
  const data = loadJSON("../json/records.json");
  const data2 = loadJSON("../json/categories.json");
  const LoginData = loadJSON("../json/users.json");
  console.log(name);
  console.log(password);
  let logged = false;
  for (let i = 0; i < LoginData.length; i++) {
    if (LoginData[i].name == name) {
      if (LoginData[i].password == password) {
        logged = true;
      }
    }
  }
  if (logged == true) {
    console.log("ssuccess!");
    res.render("views/public/login.ejs", {
      data: data,
      tags: data2,
    });
  } else {
    console.error("Wrong password or name");
  }
});
app.post("/exportRecord", (req, res) => {
  const data = loadJSON("../json/records.json");
  const record = data.find((obj) => obj.id === req.body.id);
  const fileName = `export-${req.body.id}.json`;

  fs.writeFile(fileName, JSON.stringify(record), (err) => {
    if (err) throw err;
    res.download(fileName, (err) => {
      if (err) throw err;
      fs.unlinkSync(fileName);
    });
  });
});

app.post("/upload-json", upload.single("file"), (req, res) => {
  const data = loadJSON("../json/records.json");
  const fileBuffer = req.file.buffer;
  const fileString = fileBuffer.toString("utf-8");
  const jsonData = JSON.parse(fileString);
  console.log(jsonData);
  data.unshift(jsonData);
  saveJSON("../json/records.json", data);
  // Send a response to the client
  res.send("File uploaded successfully.");
});

app.post("/addRecord", (req, res) => {
  const body = req.body;
  const data = loadJSON("../json/records.json");
  const sessionLog = new SessionLog(
    Date.now().toString(),
    body.date,
    body.timespent,
    body.rating,
    body.language,
    body.description,
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
  console.log(currentJson, body);
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
  console.log(body);
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
  console.log(body.id);
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
  console.log(tag);
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

app.post("/programmer", (req, res) => {
  const currentJson = loadJSON("../json/records.json");
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
      saveJSON("../json/records.json", currentJson);
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
      saveJSON("../json/records.json", newRecordsJson);
      break;
  }
  res.redirect("/");
});

app.post("/category", (req, res) => {
  const currentJson = loadJSON("../json/records.json");
  const categoriesJson = loadJSON("../json/categories.json");
  const body = req.body;
  switch (body.settings) {
    case "Add":
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
      saveJSON("../json/records.json", currentJson);
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
      saveJSON("../json/records.json", currentJson);
      saveJSON("../json/categories.json", newCategoryJson);
      break;
  }
  res.redirect("/");
});
app.delete('/users/:Uid/records/:Rid',(req,res)=>{
  const id = req.params;
  console.log(id);
  const currentJson = loadJSON("../json/records.json");
  console.log("R Id  _ "+id.Rid)
  for (let i = 0; i < currentJson.length; i++) {
    console.log("json ID _ "+currentJson[i].id)
    if (currentJson[i].id == id.Rid) {
      currentJson.splice(i, 1);
   console.log("found")
      res.status(200).send();
      saveJSON("../json/records.json", currentJson);
      return;
    }
  }
  console.log("lmao")

    res.status(404).send();
  

});
app.get('/users/:Uid/records/:Rid',(req,res)=>{
  const id = req.params;
  
  const currentJson = loadJSON("../json/records.json");
  for (let i = 0; i < currentJson.length; i++) {
    console.log("json == " +currentJson[i].id+"  =?=   Rid == " + id.Rid )
    if (currentJson[i].id == id.Rid) {
      
      console.log(currentJson[i])
      res.send(currentJson[i])

      return;
    }
  }
    res.status(404).send();
  

});
app.get('/users/:Uid/records/',(req,res)=>{
  const id = req.params;
  var Complete = [];
  const currentJson = loadJSON("../json/records.json");
  for (let i = 0; i < currentJson.length; i++) {
    if (currentJson[i].userId == id.Uid) {
      
      console.log(currentJson[i])
     Complete.push(currentJson[i])
     
      
    }
  }
  res.send(Complete)
    res.status(404).send();
  

});
app.put('/users/:Uid/records/:Rid',(req,res)=>{
  const id = req.params;
  
  const currentJson = loadJSON("../json/records.json");

  sessionLog= req.body;
  currentJson.forEach((jsonObject) => {
    if (jsonObject.id ==      req.body.id) {
      jsonObject.date =       req.body.date;
      jsonObject.userId =       id.Uid;

      jsonObject.timespent =  req.body.timespent;
      jsonObject.rating =     req.body.rating;
      jsonObject.language =   req.body.language;
      jsonObject.description =req.body.description;
      jsonObject.programmer = req.body.programmer;
      jsonObject.category = Array.isArray(req.body.category)
        ? req.body.category
        : [req.body.category];
        
    }
  });
  saveJSON("../json/records.json", currentJson);
 res.status(200).send()



});
app.post('/users/:Uid/records/',(req,res)=>{
  const id = req.params;

  const currentJson = loadJSON("../json/records.json");
  req.body.userId = id.Uid;
  req.body.category =[]
  currentJson.push(req.body);
  saveJSON("../json/records.json", currentJson);
  res.send(req.body)
    
});
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port} \n(Port: ${port})`)
);
