import express, {} from 'express';
import { AppDataSource } from "../data-source.js";
const router = express.Router();
AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((error) => {
    console.log("Error initializing Data Source:", error);
});
router.get("/", (req, res) => {
    res.send("Hello World");
});
export default router;
//# sourceMappingURL=login.js.map