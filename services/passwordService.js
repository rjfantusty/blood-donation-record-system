const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const hashed_password = await bcrypt.hash(password, 10);
  return hashed_password;
};

async function verifyPassword(hashed_password, password) {
  console.log(hashed_password, password)
  const matches = await bcrypt.compare(password, hashed_password);
  return matches;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
