const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../data", "users.json");

function setUsers(users) {
    fs.mkdirSync(path.dirname(USERS_FILE), {recursive: true});
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function getUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, "utf-8");
        return JSON.parse(data);
    } catch(error)
    {
        if(error.code === "ENOENT")
            return [];
        else
            throw error;
    }
}

function checkUserExist(user) {
    return getUsers().find((item) => item.login == user.login);
}

function loginUser(user) {
    const findUser = checkUserExist(user);
    if(!findUser)
        return null;
    if(findUser.password != user.password)
        return false;
    return findUser;
    
}
module.exports = {
    setUsers,
    getUsers,
    checkUserExist,
    loginUser,
}