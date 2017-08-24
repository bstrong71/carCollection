const express     = require("express");
const Cars        = require("../models/cars/cars");
const router      = express.Router();





router.get("/", function(req, res) {

  res.render("thecars");
})


router.get("/create", function(req, res) {
  Cars.create({
    make: "Chevrolet",
    model: "Caprice",
    year: 1977,
    engine: [{
        cylinders: 8,
        displacement: '5.7L'
      }],
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  })


  res.render("");
})
// Endpoints to use: edit, delete, create, retrieve //




module.exports = router;
