const axios = require("axios");
const config = require("../config/default.json");

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = config;

let accessToken = "";
let tokenExpiresAt = 0;

// функция для обновления токена
async function getAccessToken() {
  if (Date.now() < tokenExpiresAt && accessToken) {
    return accessToken; // токен ещё жив
  }

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          ),
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiresAt = Date.now() + response.data.expires_in * 1000; // сохраняем время жизни токена

  return accessToken;
}

module.exports = getAccessToken;
