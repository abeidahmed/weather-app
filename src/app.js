const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Abeid Ahmed"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Suhail Ahmed"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Samim Fatima",
    message: "Hello mama kane, I am here to help you. There is a reason why i want to help you and get things done."
  });
});

app.get("/weather", (req, res) => {
  const searchLocation = req.query.address;
  if (!searchLocation) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(searchLocation, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecast) => {
      if (error) return res.send({ error });

      res.send({
        location,
        address: searchLocation,
        forecast
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error",
    name: "Abeid Ahmed",
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error",
    name: "Abeid Ahmed",
    errorMessage: "Page not found"
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}!`);
});
