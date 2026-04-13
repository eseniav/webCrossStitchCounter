const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const USERS_FILE = path.join(__dirname, "data", "users.json");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.redirect("auth.html");
})

app.post("/register", (req, res) => {
    const regUser = req.body;
    delete regUser.repeatPassword;
    console.log(regUser);
    if(!regUser.login || !regUser.password)
        return res.status(400).send("Заполните поля логин и пароль");
    let users;
    try {
        const data = fs.readFileSync(USERS_FILE, "utf-8");
        users = JSON.parse(data);
    } catch(error)
    {
        if(error.code === "ENOENT")
            users = [];
        else
            throw error;
    }
    const exists = users.find((item) => item.login == regUser.login);
    if(exists)
        return res.status(409).send("Пользователь с таким логином уже существует");
    
    users.push(regUser);
    fs.mkdirSync(path.dirname(USERS_FILE), {recursive: true});
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    res.redirect("auth.html");
})

app.post("/auth", (req, res) => {
    const regUser = req.body;
    if(!regUser.login || !regUser.password)
        return res.status(400).send("Заполните поля логин и пароль");
    let users;
    try {
        const data = fs.readFileSync(USERS_FILE, "utf-8");
        users = JSON.parse(data);
    } catch(error)
    {
        throw error;
    }
    const respond = users.find((item) => item.login == regUser.login && item.password == regUser.password);
    if(!respond)
        return res.status(401).send("Ошибка авторизации. Проверьте правильность заполнения полей");
    res.redirect("gallery.html");
})

app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
})