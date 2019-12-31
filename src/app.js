const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("../utils/geoCode");
const forecast = require("../utils/forecast");

// Initialise App
const app = express();

const PORT = process.env.PORT || 8080;

// Specify directory paths for express config.
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const READMEpath = path.join(__filename, "../../README.md");

// Setup handlebars engine and views location.
app.set("view engine", "hbs");

// Specify views in case of no "views" directory.
app.set("views", viewsPath);

// Setup Partials
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Arpit Malik",
    message: "Enter the location to find the weather."
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Arpit Malik",
    aboutmessage: `Hi! 
    My name is Arpit Malik. 
    I am a frontend developer. 
    I work on React JS. I have a good knowledge of CSS (SASS) too and I like to create a good user experience in my web-apps. 
    I am exploring the world of backend so that I can fulfil my ambition, which is to be a full stack developer.`
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Arpit Malik"
  });
});

// app.get("/help", (req, res) => {
//   res.sendFile(READMEpath);
// });

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({ error: "You must provide an address." });
  }

  geoCode(
    req.query.location,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send(error);

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });

        res.send({
          forecast: forecastData,
          location,
          address: req.query.location
        });
      });
    }
  );

  // res.send({
  //   forecast: "Lovely Day",
  //   location: "New Delhi",
  //   address: req.query.location
  // });
});

// app.get("/products", (req, res) => {
//   res.send({
//     forecast: "Lovely Day",
//     location: "New Delhi"
//   });
// });

app.get("*", (req, res) => {
  res.render("404error", {
    title: "Error 404",
    name: "Arpit Malik",
    errorMessage: "Page not found."
  });
});

// Create Server.
app.listen(PORT, () => {
  console.log("Server is up on port - " + PORT + ".");
});
