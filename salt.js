const crypto = require("crypto");
const password = "1234";
const salt = crypto.randomBytes(16).toString("hex");
console.log({ salt });
const hash = crypto
  .pbkdf2Sync(password, salt, 1000, 64, "sha512")
  .toString("hex");
console.log({ hash });

