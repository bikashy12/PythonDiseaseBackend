const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  diseases: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "PatientRecord",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
