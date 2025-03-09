class IndexController {
    async getHome(req, res) {
        res.status(200).json({ message: "Welcome to the Splash API!" });
    }

    async getData(req, res) {
        // Logic to retrieve data
        res.status(200).json({ data: "Sample data" });
    }

    // Additional methods for handling other API requests can be added here
}

module.exports = IndexController;