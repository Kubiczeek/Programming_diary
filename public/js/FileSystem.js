const fs = require("fs");
const path = require("path");

class SessionLog {
  constructor(
    id,
    date,
    time_spent,
    rating,
    programming_language,
    description,
    userId,
    category
  ) {
    this.id = id;
    this.date = date;
    this.time_spent = time_spent;
    this.rating = rating;
    this.programming_language = programming_language;
    this.description = description;
    this.userId = userId;
    this.category = category || [""];
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

function convertJsonToCsv(jsonData) {
  const objectsArray = jsonData;

  const columnHeaders = Object.keys(objectsArray[0]);
  const csvRows = [];

  csvRows.push(columnHeaders.join(","));

  for (const object of objectsArray) {
    const values = columnHeaders.map((header) => object[header]);
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}

function convertCsvToJson(csvData) {
  const lines = csvData.split("\n");
  const headers = lines[0].split(",");
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }

    result.push(obj);
  }

  return JSON.stringify(result);
}

module.exports = {
  SessionLog,
  Tag,
  User,
  loadJSON,
  saveJSON,
  convertJsonToCsv,
  convertCsvToJson,
};
