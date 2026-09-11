import express, {type Request, type Response}   from 'express'; 

import {AppDataSource} from "../data-source.js";


const router = express.Router();

AppDataSource.initialize().then(() =>{
    console.log("Data Source has been initialized!")
}).catch((error: unknown)=>{ 
    console.log("Error initializing Data Source:", error)});

router.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

export default router;