const User = require("../Model/user");
const mongoose = require("mongoose");
var patientRecord = require("../Model/usermodel");

const getRecord = async (req,res,next) => {
    const userName = req.params.user;
    patientRecord
      .find()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
    });
}

const postRecord = async (req,res,next) => {
    const { name, age, date, symptoms, disease, user } = req.body;
    var newUser = new patientRecord({
      name,
      age,
      date,
      symptoms,
      disease,
      user,
    });

    let userdata;
    try {
      userdata = await User.findById(user);
    } catch (err) {
      console.log(err);
    }
    if (!userdata) {
      console.log("Could not find user for provided id");
    }
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await newUser.save({ session: sess });
      userdata.diseases.push(newUser);
      await userdata.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json({ newUser });
}

exports.postRecord = postRecord;
exports.getRecord = getRecord;