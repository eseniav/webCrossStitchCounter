const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("app is running");
})

app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
})