const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  //get undername and password from request
  const { username, password } = req.body;

  const userInDatabase = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  //ask bcrypt to encrypt the password and compare with the encrypted pw in the database, it returns a boolean.
  const passwordIsValid = await bcrypt.compare(
    password,
    userInDatabase.password
  );

  if (!userInDatabase || !passwordIsValid) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET);

  res.json({ data: token });
});

module.exports = router;
