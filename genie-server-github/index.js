const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY || "geniegamekeyapi2010";

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.post("/score", (req, res) => {
  if (req.headers["x-api-key"] !== API_KEY) {
    return res.status(403).send("Invalid API Key");
  }

  const { playerName, score, paid, won } = req.body;
  const newEntry = {
    timestamp: new Date().toISOString(),
    playerName,
    score,
    paid,
    won
  };

  let data = [];
  if (fs.existsSync("scores.json")) {
    const rawData = fs.readFileSync("scores.json");
    data = JSON.parse(rawData);
  }

  data.push(newEntry);
  fs.writeFileSync("scores.json", JSON.stringify(data, null, 2));

  res.send("Score saved successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
