var jwt = require("jsonwebtoken");

const createToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET, {
    expiresIn: "2h",
  });
  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, process.env.TOKEN_SECRET);
  return data;
};

module.exports = {
  createToken,
  verifyToken,
};
