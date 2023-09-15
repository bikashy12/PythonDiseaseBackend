var mongoose = require("mongoose");
var express = require("express");
var app = express();

var Schema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  date: { type: String, required: true },
  symptoms: { type: String, required: true },
  disease: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

var patientRecord = new mongoose.model("PatientRecord", Schema);
module.exports = patientRecord;
