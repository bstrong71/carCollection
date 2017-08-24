const express     = require("express");
const Cars        = require("../models/cars");
const router      = express.Router();

let results = []; //to give access to data in routes


function getCars(req, res, next) {
  Cars.find({})
    .then(function(data) {
      results = data;
      next()
    })
    .catch(function(err) {
      console.log(err);
    });
};



router.get("/", getCars, function(req, res) {
  res.render("thecars", {car: results});
});


router.post("/", function(req, res) {
  console.log("CYLINDERS: ", req.body.cylinders);
  Cars.create({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    engine: {
      cylinders: req.body.cylinders,
      displacement: req.body.displacement
    },
    color: req.body.color
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  })
  res.redirect("/");
});

// Endpoints to use: edit, delete, create, retrieve //


module.exports = router;
