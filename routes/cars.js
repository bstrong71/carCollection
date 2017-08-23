const express     = require("express");
const Cars        = require("../models/cars/cars");
const router      = express.Router();





router.get("/", function(req, res) {

  res.render("cars");
})


// Endpoints to use: edit, delete, create, retrieve //




module.exports = router;
