require("dotenv").config();
const mongoose = require("mongoose");
const Genre = require("./models/Genre");

const genres = [
  { name: "rock", color: "red" },
  { name: "Energy", color: "#0089FF" },
  { name: "hip-hop", color: "#8B00FF" },
  { name: "jazz", color: "#FFBA00" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Genre.deleteMany();
    await Genre.insertMany(genres);

    console.log("✅ Genres seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
