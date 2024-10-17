const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;
const API_HOST = process.env.API_HOST;
const SAS_TOKEN = process.env.SAS_TOKEN;

app.get("/api/proxy", async (req, res) => {
  const url = `https://${API_HOST}.blob.core.windows.net/landing/filetest010203.txt?${SAS_TOKEN}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    console.log("API response:", data);

    res.send(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Proxy server error" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
