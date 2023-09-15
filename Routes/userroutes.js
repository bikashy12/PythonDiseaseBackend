var express = require("express");
var app = new express();
var router = express.Router();
var patientRecord = require("../Model/usermodel");
const recordController = require("../controllers/records-controllers");
app.use(express.json());

router.get("/user",recordController.getRecord);

router.post("/user",recordController.postRecord);

router.route("/user/:userId").get((req, res) => {
  patientRecord
    .find({ user: req.params.userId })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.send(error));
});

module.exports = router;
