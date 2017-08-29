const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/carsDirectory");

const carsSchema = new Schema({
  make: {type: String, required: true},
  model: {type: String, required: true},
  year: {
    type: Number,
    min: [1900, "Year must be at least 1900"],
    max: [2018, "Year must be before 2019"],
    require: true},
  color: {type: String, required: true},
  cylinders: {type: Number, required: true},
  displacement: {
    type: String,
    validate: [ function(val) {
      const lastChar = val.substr(val.length - 1);
      return lastChar === "L";
    }, "Displacement must be in liters (L)."],
    required: true}
});

// creates the collection//
const Cars = mongoose.model("Cars", carsSchema);


module.exports = Cars;
