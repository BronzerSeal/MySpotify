const randomSeed = Math.random().toString(36).substring(2, 10);

function generateUserData() {
  return {
    image: `https://api.dicebear.com/9.x/adventurer/svg?seed=${randomSeed}`,
  };
}

module.exports = {
  generateUserData,
};
