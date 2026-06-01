const fs = require("fs/promises");
const path = require("path");

class DataService {
    static TAGS_FILE = path.join(__dirname, "../data", "tags.json");
    static PROJECT_FILE = path.join(__dirname, "../data", "projects.json");
    static USERS_FILE = path.join(__dirname, "../data", "users.json");
    static async getTags() {
        try {
                let data = await fs.readFile(DataService.TAGS_FILE, "utf-8");
                
                return JSON.parse(data);
            } catch(error)
            {
                if(error.code === "ENOENT")
                    return [];
                else
                    throw error;
            }
    }
    static async getProject(projectId) {
        let data = await fs.readFile(DataService.PROJECT_FILE, "utf-8");
        let projects = JSON.parse(data);
        const project = projects.find((item) => item.id == projectId);
        const user = await DataService.getUser(project.userId);
        return { ...project, login: user.login };
    }
    static async getUser(userId) {
        let data = await fs.readFile(DataService.USERS_FILE, "utf-8");
        let users = JSON.parse(data);
        return users.find((item) => item.id == userId);
    }
}

module.exports = DataService;
