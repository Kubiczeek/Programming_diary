const express = require("express");
var session = require('express-session')

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
  const data = loadJSON("../json/data.json");
  const data2 = loadJSON("../json/categories.json");
  const data3 = loadJSON("../json/programmers.json");
  const LoginData = loadJSON("../json/login.json");
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
    if (login.userName == name && login.password == password) {
      logged = true;
      login['saved_Devices'].push(ClientID)
      saveJSON("../json/login.json", LoginData);
    req.session.token = ClientID;

    }
    
  }

  if (logged == true) {
      res.render("pages/index", {
      data: data,
      categories: data2,
      programmers: data3,
    });
  } else {  
    res.render("pages/login", {
    data: data,
    categories: data2,
    programmers: data3,
  });
  }
});
app.get("/", (req, res) => {
  const data = loadJSON("../json/data.json");
  const data2 = loadJSON("../json/categories.json");
  const data3 = loadJSON("../json/programmers.json");
  const LoginData = loadJSON("../json/login.json");
  let logged = false;
  for (login of LoginData) {
    for(save of login.saved_Devices){
      if(save == req.session.token){
        logged= true
      }
    }

    
  }
  if(logged){
    res.render("pages/index", {
      data: data,
      categories: data2,
      programmers: data3,
    });
  }else{
    res.render("pages/login", {
      data: data,
  
    });}
});
app.get("/LogAdmin", (req, res) => {
  const data = loadJSON("../json/data.json");
  const data2 = loadJSON("../json/categories.json");
  const data3 = loadJSON("../json/programmers.json");
  const LoginData = loadJSON("../json/login.json");

  ClientID= req.session.token 

  LoginData.forEach((jsonObject) => {
    if (jsonObject.saved_Devices ==ClientID) {
        if(jsonObject.admin == true){
          res.redirect('/main')
        }else{

        }
    }else{
      res.render("views/public/login.ejs", {
        data: data,
        categories: data2,
        programmers: data3,
      });
    }
  });

});
app.get("/logout", (req, res) => {


    req.session.token = null
      res.render("views/public/login.ejs", {
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
app.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.Password;
  const data = loadJSON("../json/data.json");
  const data2 = loadJSON("../json/categories.json");
  const data3 = loadJSON("../json/programmers.json");
  const LoginData = loadJSON("../json/login.json");
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
      categories: data2,
      programmers: data3,
    });
  } else {
    console.error("Wrong password or name");
  }
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


app.delete('/users/:Uid/records/:Rid',(req,res)=>{
  const id = req.params;
  console.log(id);
  const currentJson = loadJSON("../json/data.json");
  console.log("R Id  _ "+id.Rid)
  for (let i = 0; i < currentJson.length; i++) {
    console.log("json ID _ "+currentJson[i].id)
    if (currentJson[i].id == id.Rid) {
      currentJson.splice(i, 1);
   console.log("found")
      res.status(200).send();
      saveJSON("../json/data.json", currentJson);
      return;
    }
  }
  console.log("lmao")

    res.status(404).send();
  

});
app.get('/users/:Uid/records/:Rid',(req,res)=>{
  const id = req.params;
  
  const currentJson = loadJSON("../json/data.json");
  for (let i = 0; i < currentJson.length; i++) {
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
  const currentJson = loadJSON("../json/data.json");
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
  
  const currentJson = loadJSON("../json/data.json");

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
  saveJSON("../json/data.json", currentJson);
 res.status(200).send()



});
app.post('/users/:Uid/records/',(req,res)=>{
  const id = req.params;

  const currentJson = loadJSON("../json/data.json");
  req.body.userId = id.Uid;
  currentJson.push(req.body);
  saveJSON("../json/data.json", currentJson);
  res.send(req.body)
    
  

});
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port} \n(Port: ${port})`)
);
