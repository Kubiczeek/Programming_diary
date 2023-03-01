const fs = require("fs");
const path = require("path");

class SessionLog {
  constructor(id, date, timespent, rating, language, description, category) {
    this.id = id;
    this.date = date;
    this.timespent = timespent;
    this.rating = rating;
    this.language = language;
    this.description = description;
    this.category = category || "";
  }
}

class Tag {
  constructor(id, name, color, description) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.description = description;
  }
}

class User {
  constructor(id, admin, username, surname, name, email, password) {
    this.id = id;
    this.admin = admin;
    this.username = username;
    this.surname = surname;
    this.name = name;
    this.email = email;
    this.password = password;
    this.saved_Devices = [];
  }
}

function loadJSON(filepath = "") {
  return fs.existsSync(path.resolve(__dirname, filepath))
    ? JSON.parse(fs.readFileSync(path.resolve(__dirname, filepath)))
    : "";
}

function saveJSON(filepath = "", json = '""') {
  return fs.writeFileSync(
    path.resolve(__dirname, filepath),
    JSON.stringify(json)
  );
}

module.exports = {
  SessionLog,
  Tag,
  User,
  loadJSON,
  saveJSON,
};
