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

//получения звука для трека
router.get("/getAudio", async (req, res) => {
  try {
    const { q } = req.query;

    const response = await axios.get(
      `https://api.deezer.com/search/track?q=${encodeURIComponent(q)}`
    );

    res.json(response.data.data[0]);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти трек" });
  }
});

// получения звука для трека с доп проверкой артиста
router.get("/getAudioPlusArtist", async (req, res) => {
  try {
    const { track, artist } = req.query;

    if (!track || !artist) {
      return res.status(400).json({ error: "Нужно передать track и artist" });
    }

    const query = `${track} ${artist}`;
    const response = await axios.get(
      `https://api.deezer.com/search/track?q=${encodeURIComponent(query)}`
    );

    const results = response.data.data;

    if (!results.length) {
      return res.status(404).json({ error: "Трек не найден" });
    }

    // можно дополнительно проверить совпадение артиста
    const found =
      results.find(
        (r) => r.artist.name.toLowerCase() === artist.toLowerCase()
      ) || results[0];

    if (!response.data.data.length) {
      return res.status(404).json({ error: "Not found" });
    }

    const formatFound = {
      preview: found.preview,
    };

    res.json(formatFound);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти трек" });
  }
});

module.exports = router;
