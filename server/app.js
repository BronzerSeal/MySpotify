const express = require("express");
const config = require("./config/default.json");
const cors = require("cors");

const app = express();
const PORT = config.port || 8080;
app.use(cors());

const trackRoutes = require("./routes/tracks.routes");
app.use("/track", trackRoutes);

const artistRouter = require("./routes/artists.routes");
app.use("/artist", artistRouter);

const albumRouter = require("./routes/albums.routes");
app.use("/album", albumRouter);

const playlistRouter = require("./routes/playlists.routes");
app.use("/playlist", playlistRouter);

app.listen(PORT, () =>
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
);
