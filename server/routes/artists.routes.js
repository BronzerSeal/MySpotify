const express = require("express");
const axios = require("axios");
const getAccessToken = require("../utils/getAccessToken");
const router = express.Router({ mergeParams: true });

let accessToken = "";

//маршрут получения артистa по id
router.get("/searchArtistById", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${q}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти артиста" });
  }
});

// маршрут поиска артистов по имени
router.get("/searchArtistsByName", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=artist&limit=10`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data.artists.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти артистов" });
  }
});

// маршрут поиска артистa по имени
router.get("/searchArtistByName", async (req, res) => {
  const { q } = req.query;
  if (!accessToken) accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=artist&limit=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data.artists.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось найти артиста" });
  }
});

//маршрут получения 10 рандомных артистов
router.get("/randomArtists", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];

    const randomOffset = Math.floor(Math.random() * 1000);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${randomLetter}&type=artist&limit=10&offset=${randomOffset}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.json(response.data.artists.items);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось получить случайных артистов" });
  }
});

// Маршрут для топ-10 треков артиста
router.get("/:id/top-tracks", async (req, res) => {
  try {
    const artistId = req.params.id;
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=Us`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Формируем только нужные поля для фронтенда
    // const topTracks = response.data.tracks.slice(0, 10).map((track) => ({
    //   id: track.id,
    //   name: track.name,
    //   album: {
    //     name: track.album.name,
    //     image: track.album.images[0]?.url,
    //   },
    //   preview_url: track.preview_url,
    //   spotify_url: track.external_urls.spotify,
    // }));

    // res.json(topTracks);
    res.json(response.data.tracks);
  } catch (error) {
    console.error(
      "Ошибка при получении топ-треков артиста:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Не удалось получить топ-треки артиста" });
  }
});

module.exports = router;
