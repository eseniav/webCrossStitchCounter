const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.redirect("auth.html");
})

app.post("/register", (req, res) => {
    const data = req.body;
    console.log(data);
    if(!data.login || !data.password)
        return res.status(400).send("Заполните поля логин и пароль");
    res.redirect("auth.html");
})

app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
})