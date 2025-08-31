const express = require("express");
const axios = require("axios");
const getAccessToken = require("../utils/getAccessToken");
const router = express.Router({ mergeParams: true });

let accessToken = "";

// маршрут поиска плейлиста по id
router.get("/searchPlaylistById", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${q}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти плейлист" });
  }
});

// маршрут поиска плейлистов по имени
router.get("/searchPlaylistsByName", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=playlist&limit=10`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти плейлисты" });
  }
});

// маршрут поиска плейлиста по имени
router.get("/searchPlaylistByName", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=playlist&limit=1`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти плейлист" });
  }
});

//маршрут получения 10 рандомных плейлистов
router.get("/randomPlaylists", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];

    const randomOffset = Math.floor(Math.random() * 1000);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${randomLetter}&type=playlist&limit=10&offset=${randomOffset}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.json(response.data.playlists.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось получить случайные плейлисты" });
  }
});

module.exports = router;
