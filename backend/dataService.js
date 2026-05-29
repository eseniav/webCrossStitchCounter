const fs = require("fs/promises");
const path = require("path");

class DataService {
    static TAGS_FILE = path.join(__dirname, "../data", "tags.json");
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
}

module.exports = DataService;
