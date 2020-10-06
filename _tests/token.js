const fs = require('fs');

function saveTokens(str) {
  fs.writeFileSync("token.txt", str);
}

function getToken() {
  const buf = fs.readFileSync("token.txt");
  return buf.toString()
}

module.exports = {
  getToken,
  saveTokens
}
