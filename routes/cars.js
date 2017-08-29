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
  Cars.create({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    cylinders: req.body.cylinders,
    displacement: req.body.displacement
  })
  .then(function(data) {
    res.redirect("/newcar")
  })
  .catch(function(err) {
    res.redirect("/");
  })

});

router.get("/newcar", getCars, function(req, res) {
  res.render("thecars", {car: results});
});

router.get("/edit/:id", function(req, res) {
  Cars.find({_id: req.params.id})
  .then(function(data) {
    res.render("editcar", {car: data})
  })
  .catch(function(err) {
    res.redirect("/");
  })
});

router.post("/edit", function(req, res) {
  let updatedCar = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    cylinders: req.body.cylinders,
    displacement: req.body.displacement
  }
  Cars.update({_id: req.body.id},
    updatedCar)
  .then(function(data) {
    res.redirect("/")
  })
  .catch(function(err) {
    res.redirect("/")
  })
});

router.get("/delete/:id", function(req, res) {
  Cars.remove({_id: req.params.id})
  .then(function(data) {
    res.redirect("/")
  })
  .catch(function(err) {
    console.log("ERR: ", err);
  })
});

module.exports = router;
