const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = config.get("port") ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const trackRoutes = require("./routes/tracks.routes");
app.use("/track", trackRoutes);

const artistRouter = require("./routes/artists.routes");
app.use("/artist", artistRouter);

const albumRouter = require("./routes/albums.routes");
app.use("/album", albumRouter);

const playlistRouter = require("./routes/playlists.routes");
app.use("/playlist", playlistRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    console.log(`MongoDB connected.`);
    app.listen(PORT, () =>
      console.log(`🚀 Server has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start();
