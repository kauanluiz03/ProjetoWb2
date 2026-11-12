import express, {type Request, type Response}   from 'express'; 

const router = express.Router();

    
router.get("/test-connection", (req: Request, res: Response) => {

    res.status(200).json({ message: "Conexão com a API realizada com sucesso!" });
});

export default router;