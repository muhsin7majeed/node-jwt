const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

// Home Route
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

// Posts Route
app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData
      });
    }
  });
});

// Login Route
app.post("/api/login", (req, res) => {
  // User Data
  const User = {
    id: 1,
    name: "Snape",
    email: "snape@hogwards.com"
  };

  // JWT sign

  jwt.sign({ User }, "secretkey", (err, token) => {
    res.json({
      token
    });
  });
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    //   forbidden
    res.sendStatus(403);
  }
}

// Server Running
app.listen(3000, () => "server running on ");
