import express, {type Request, type Response}   from 'express';
import { AppDataSource } from '../data-source.js';
import { ProductCategories} from '../entity/ProductCategories.js'; 
import { PaginationServices } from '../services/PaginationServices.js';


const router = express.Router();

//criar lista de categorias
router.get("/", async (req: Request, res: Response) => {
    try{
        //obter o repositório de categorias
        const productCategoriesRepository = AppDataSource.getRepository(ProductCategories);

        //receber o numero de paginas e definir pagina 1 como padrão
        const page = Number(req.query.page) || 1;
        console.log(page);

        // Definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationServices.paginate(productCategoriesRepository, page, limit,{ id: "DESC" });

        

        // Retornar a resposta com os dados e informações de paginação
        res.status(200).json(result);
        return

    }catch(error){
        res.status(500).json({
            messagem: "Erro ao listar categorias",
        });
        return
    }
});

//criar a visualização de uma categoria específica
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try{

        const { id } = req.params;
        
        const productCategoriesRepository = AppDataSource.getRepository(ProductCategories);

        const category = await productCategoriesRepository.findOneBy({ id: parseInt(id)});

        if(!category){
            res.status(404).json({
                messagem: "Categoria não encontrada",
            });
            return
        }

        res.status(200).json(category);

        return

    }catch(error){
        res.status(500).json({
            messagem: "Erro ao listar categorias",
        });
        return
    }
});

//cadastrar uma nova categoria
router.post("/", async(req: Request, res: Response) => {

    try{
        const productCategoriesRepository = AppDataSource.getRepository(ProductCategories);
        const newProductCategories = productCategoriesRepository.create(req.body);
        await productCategoriesRepository.save(newProductCategories);
        res.status(201).json({
            messagem: "Categoria cadastrada com sucesso",
            category: newProductCategories,
        });
        

    }catch(error){
        console.error("Erro ao cadastrar categoria:", error);
        res.status(500).json({  
        messagem: "Erro ao cadastrar categoria",
        

    });  
    
}});


//atualizar a categoria específica
router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try{

        const { id } = req.params;

        var data = req.body;
        
        const productCategoriesRepository = AppDataSource.getRepository(ProductCategories);

        const category = await productCategoriesRepository.findOneBy({ id: parseInt(id)});

        if(!category){
            res.status(404).json({
                messagem: "Categoria não encontrada",
            });
            return
        }

        productCategoriesRepository.merge(category, data);
        const updatedCategory = await productCategoriesRepository.save(category);

        res.status(200).json(updatedCategory);{
            messagem: "Categoria atualizada com sucesso"
        };


    }catch(error){
        res.status(500).json({
            messagem: "Erro ao atualizar categoria",
        });
        return
    }
});

//deletar a categoria específica
router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try{

        const { id } = req.params;
        
        const productCategoriesRepository = AppDataSource.getRepository(ProductCategories);

        const category = await productCategoriesRepository.findOneBy({ id: parseInt(id)});

        if(!category){
            res.status(404).json({
                messagem: "Categoria não encontrada",
            });
            return
        }

        productCategoriesRepository.remove(category);
        

        res.status(200).json();{
            messagem: "Categoria removida com sucesso"
        };


    }catch(error){
        res.status(500).json({
            messagem: "Erro ao remover categoria",
        });
        return
    }
});

export default router;