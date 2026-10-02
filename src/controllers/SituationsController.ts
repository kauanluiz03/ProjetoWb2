import express, {type Request, type Response}   from 'express';
import { AppDataSource } from '../data-source.js';
import { Situations } from '../entity/Situations.js'; 

const router = express.Router();

    
router.get("/", (req: Request, res: Response) => {
    res.send("Hello World situations");
});

router.post("/", async(req: Request, res: Response) => {

    try{
        const situationsRepository = AppDataSource.getRepository(Situations);
        const newSituations = situationsRepository.create(req.body);
        await situationsRepository.save(newSituations);
        res.status(201).json({
            messagem: "Situação cadastrada com sucesso",
            situation: newSituations,
        });
        

    }catch(error){
        console.error("Erro ao cadastrar situação:", error);
        res.status(500).json({  
        messagem: "Erro ao cadastrar situação",
        

    });  
    
}});

export default router;