const fs = require("fs");
const path = require("path");

class SessionLog {
  constructor(
    id,
    date,
    timespent,
    rating,
    language,
    description,
    programmer,
    category
  ) {
    this.id = id;
    this.date = date;
    this.timespent = timespent;
    this.rating = rating;
    this.language = language;
    this.description = description;
    this.programmer = programmer || "none";
    this.category = category || "";
  }
}

class Programmer {
  constructor(name) {
    this.name = name;
  }
}

class Category {
  constructor(name, color, description) {
    this.name = name;
    this.color = color;
    this.description = description;
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
  Programmer,
  Category,
  loadJSON,
  saveJSON,
};
