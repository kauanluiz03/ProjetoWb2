import express, {type Request, type Response}   from 'express';
import { AppDataSource } from '../data-source.js';
import { ProductSituations } from '../entity/ProductSituations.js'; 
import { PaginationServices } from '../services/PaginationServices.js';

const router = express.Router();

//criar lista de situações
router.get("/", async (req: Request, res: Response) => {
    try{
        //obter o repositório de situações
        const productSituationsRepository = AppDataSource.getRepository(ProductSituations);

        //receber o numero de paginas e definir pagina 1 como padrão
        const page = Number(req.query.page) || 1;
        console.log(page);

        // Definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationServices.paginate(productSituationsRepository, page, limit,{ id: "DESC" });

        

        // Retornar a resposta com os dados e informações de paginação
        res.status(200).json(result);
        return

    }catch(error){
        res.status(500).json({
            messagem: "Erro ao listar situações",
        });
        return
    }
});

//criar a visualização de uma situação específica
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try{

        const { id } = req.params;
        
        const productSituationsRepository = AppDataSource.getRepository(ProductSituations);

        const situation = await productSituationsRepository.findOneBy({ id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                messagem: "Situação não encontrada",
            });
            return
        }

        res.status(200).json(situation);

        return

    }catch(error){
        res.status(500).json({
            messagem: "Erro ao listar situações",
        });
        return
    }
});

//cadastrar uma nova situação
router.post("/", async(req: Request, res: Response) => {

    try{
        const productSituationsRepository = AppDataSource.getRepository(ProductSituations);
        const newProductSituations = productSituationsRepository.create(req.body);
        await productSituationsRepository.save(newProductSituations);
        res.status(201).json({
            messagem: "Situação cadastrada com sucesso",
            situation: newProductSituations,
        });
        

    }catch(error){
        console.error("Erro ao cadastrar situação:", error);
        res.status(500).json({  
        messagem: "Erro ao cadastrar situação",
        

    });  
    
}});


//atualizar a situação específica
router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try{

        const { id } = req.params;

        var data = req.body;
        
        const productSituationsRepository = AppDataSource.getRepository(ProductSituations);

        const situation = await productSituationsRepository.findOneBy({ id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                messagem: "Situação não encontrada",
            });
            return
        }

        productSituationsRepository.merge(situation, data);
        const updatedSituation = await productSituationsRepository.save(situation);

        res.status(200).json(updatedSituation);{
            messagem: "Situação atualizada com sucesso"
        };


    }catch(error){
        res.status(500).json({
            messagem: "Erro ao atualizar situação",
        });
        return
    }
});

//deletar a situação específica
router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try{

        const { id } = req.params;
        
        const productSituationsRepository = AppDataSource.getRepository(ProductSituations);

        const situation = await productSituationsRepository.findOneBy({ id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                messagem: "Situação não encontrada",
            });
            return
        }

        productSituationsRepository.remove(situation);
        

        res.status(200).json();{
            messagem: "Situação removida com sucesso"
        };


    }catch(error){
        res.status(500).json({
            messagem: "Erro ao atualizar situação",
        });
        return
    }
});

export default router;