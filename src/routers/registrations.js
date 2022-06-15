const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  //i receive data from the request
  const { username, password } = req.body;

  //first i create an encrypted password
  const encryptedPassword = await bcrypt.hash(password, 10);

  //here i will create the user with the encrypted password
  const createdUser = await prisma.user.create({
    data: {
      username: username,
      password: encryptedPassword,
    },
  });

  res.json({ data: createdUser });
});

module.exports = router;
