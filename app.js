const express = require("express");
const path = require("path");
const userService = require("./backend/userService");
const data = require("./data/data");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.redirect("auth.html");
})

app.get(["/home", "/gallery", "/login", "/statistics"], (_, res) => {
    res.sendFile(path.join(__dirname, "/public", "index.html"));
})
app.get("/projects", (_, res) => {
    res.json(data.projects);
})

app.get("/users", (_, res) => {
    res.json(data.users);
})

app.post("/register", async (req, res) => {
    const regUser = req.body;
    delete regUser.repeatPassword;
    if(!regUser.login || !regUser.password)
        return res.status(400).send("Заполните поля логин и пароль");
    users = await userService.getUsers();
    if(await userService.checkUserExist(regUser))
        return res.status(409).send("Пользователь с таким логином уже существует");
    
    users.push(regUser);
    await userService.setUsers(users);
    res.redirect("auth.html");
})

app.post("/auth", async (req, res) => {
    const regUser = req.body;
    if(!regUser.login || !regUser.password)
        return res.status(400).send("Заполните поля логин и пароль");
    const result = await userService.loginUser(regUser);
    if(result == null)
        return res.status(401).send("Пользователь не найден");
    if(!result)
        return res.status(401).send("Ошибка авторизации. Проверьте правильность заполнения полей");
    res.redirect("gallery.html");
})

app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
})