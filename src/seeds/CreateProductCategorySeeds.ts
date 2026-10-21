import { DataSource } from "typeorm"; 
import { ProductCategories } from "../entity/ProductCategories.js";



export default class CreateProductCategoriesSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando a criação de seeds para a tabela 'product_categories'...");

        const categoryRepository = dataSource.getRepository(ProductCategories);

        const existingCategories = await categoryRepository.count();

        if (existingCategories > 0) {

            console.log ("a tabela 'product_categories' já possui dados. Nenhuma alteração foi realizada.");
            return;
        }

        const categories = [
            {name: "Eletrônicos"},
            {name: "Roupas"},
            {name: "Alimentos"},
            
        ]

        await categoryRepository.save(categories);

        console.log("Seeds para a tabela 'product_categories' criadas com sucesso!");

    }       


    
}
    