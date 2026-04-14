const fs = require("fs/promises");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../data", "users.json");

async function setUsers(users) {
    await fs.mkdir(path.dirname(USERS_FILE), {recursive: true});
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

async function getUsers() {
    try {
        let data = await fs.readFile(USERS_FILE, "utf-8");
        
        return JSON.parse(data);
    } catch(error)
    {
        if(error.code === "ENOENT")
            return [];
        else
            throw error;
    }
}

async function checkUserExist(user) {
    return (await getUsers()).find((item) => item.login == user.login);
}

async function loginUser(user) {
    const findUser = await checkUserExist(user);
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