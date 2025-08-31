const express = require("express");
const axios = require("axios");
const getAccessToken = require("../utils/getAccessToken");
const router = express.Router({ mergeParams: true });

let accessToken = "";

// маршрут для поиска треков по названию
router.get("/searchTracks", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=track&limit=10`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(response.data.tracks.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти треки" });
  }
});

// маршрут для поиска трека по названию
router.get("/searchTrack", async (req, res) => {
  const { q } = req.query; // название трека
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=track&limit=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data.tracks.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти трек" });
  }
});

//маршрут получения 10 рандомных треков
router.get("/randomTracks", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];

    // поиск треков по случайной букве
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${randomLetter}&type=track&limit=10`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data.tracks.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось получить случайные треки" });
  }
});

module.exports = router;
