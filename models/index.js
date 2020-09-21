'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

//DB connection with Sequelize
//check if env var is set
let sequelize;
//adding Heroku DB connection credentials

  if (process.env.APP_ENV === "development") {
    //printing message if uding dev enviro nment
    console.log("USING DEV Vars for DB Connection\n");
    //instantiating DB connection with sequelize
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: process.env.SQL_DIALECT,
      operatorsAliases: false //string based operators deprecated warning. (symbopl based ops will be used)
    });
  } else if ((process.env.APP_ENV === "deployment") && (process.env.JAWSDB_URL)) {
    //adding Heroku credentials for JAWSDB connection
    sequelize = new Sequelize(process.env.JAWSDB_URL, {
      dialect: process.env.SQL_DIALECT,
      operatorsAliases: false //string based operators deprecated warning. (symbol based ops will be used)
    });
  } else {
    //if not env set in .env, use config.json in pre-defined development env
    const config = require(__dirname + '/../config/config.json')["development"];
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

//identifying models from corresponding directory and loading them
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  //associating models if any was indicated
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
