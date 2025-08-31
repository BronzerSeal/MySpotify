const express = require("express");
const axios = require("axios");
const getAccessToken = require("../utils/getAccessToken");
const router = express.Router({ mergeParams: true });

let accessToken = "";

// маршрут поиска альбомов по id
router.get("/searchAlbumById", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums/${q}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти альбом" });
  }
});

// маршрут поиска альбомов по имени
router.get("/searchAlbumsByName", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=album&limit=10`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data.albums.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти альбомы" });
  }
});

// маршрут поиска альбома по имени
router.get("/searchAlbumByName", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=album&limit=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data.albums.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти альбом" });
  }
});

//маршрут получения 10 рандомных альбомов
router.get("/randomAlbums", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];

    const randomOffset = Math.floor(Math.random() * 1000);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${randomLetter}&type=album&limit=10&offset=${randomOffset}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.json(response.data.albums.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось получить случайные альбомы" });
  }
});

module.exports = router;
