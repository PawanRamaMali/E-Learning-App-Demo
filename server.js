// *****************************************************************************
// Server.js - App Starting point. Initializes Node JS server
//
// ******************************************************************************
// *** Importing Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const sequelize_fixtures = require("sequelize-fixtures");
require("custom-env").env("dev"); //env vars for development

// Instantiating Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8000;

// Requiring models for syncing
// =============================================================
const db = require("./models/");

//setting data parsing middlewares --JSON-- with Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //request body parser

//Static Resources
app.use(express.static(path.join(__dirname, "client/public"))); //TODO: need to change to client/build for production

// Routes
// =============================================================
require("./routes/auth_router.js")(app); //authentication and login api routes
require("./routes/user_router.js")(app); //student and instructor portals
require("./routes/html-routes")(app);

// Syncing DB models and then starting express server
// =============================================================
db.sequelize.sync({ force: true }).then(() => {
  sequelize_fixtures.loadFile("./db/fixtures/*", db).then(() => {
    console.log("===== DB Seeded Properly =====");
    app.listen(PORT, () => {
      console.log(
        `===== SERVER ON => App listening on PORT ${PORT} :: ${process.env.APP_ENV} environment. =====`
      );
    });
  });
});
