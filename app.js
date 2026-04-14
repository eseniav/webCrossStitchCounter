const express = require("express");
const path = require("path");
const userService = require("./backend/userService");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.redirect("auth.html");
})

app.post("/register", (req, res) => {
    const regUser = req.body;
    delete regUser.repeatPassword;
    if(!regUser.login || !regUser.password)
        return res.status(400).send("Заполните поля логин и пароль");
    users = userService.getUsers();
    if(userService.checkUserExist(regUser))
        return res.status(409).send("Пользователь с таким логином уже существует");
    
    users.push(regUser);
    userService.setUsers(users);
    res.redirect("auth.html");
})

app.post("/auth", (req, res) => {
    const regUser = req.body;
    if(!regUser.login || !regUser.password)
        return res.status(400).send("Заполните поля логин и пароль");
    if(userService.loginUser(regUser) == null)
        return res.status(401).send("Пользователь не найден");
    if(!userService.loginUser(regUser))
        return res.status(401).send("Ошибка авторизации. Проверьте правильность заполнения полей");
    res.redirect("gallery.html");
})

app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
})