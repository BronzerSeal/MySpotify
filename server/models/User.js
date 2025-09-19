const { Schema, model } = require("mongoose");

const genreSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: String,
    sex: { type: String, enum: ["male", "female", "other"] },
    genres: [genreSchema],
    dopInfo: { type: String },
    favouriteArtists: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
