import { AppDataSource } from "./data-source.js";
import CreateSituationSeeds from "./seeds/CreateSituationSeeds.js";
import CreateProductSituationsSeeds from "./seeds/CreateProductsSituationSeeds.js";
import CreateProductCategoriesSeeds from "./seeds/CreateProductCategorySeeds.js";
const runSeeds = async () => {
    console.log("conectando ao banco de dados...");
    await AppDataSource.initialize();
    console.log("conexão estabelecida com sucesso!");
    try {
        //cria as instancia das classes de seeds
        const situationSeeds = new CreateSituationSeeds();
        const productSituationSeeds = new CreateProductSituationsSeeds();
        const productCategorySeeds = new CreateProductCategoriesSeeds();
        //executa os seeds
        await situationSeeds.run(AppDataSource);
        await productSituationSeeds.run(AppDataSource);
        await productCategorySeeds.run(AppDataSource);
    }
    catch (error) {
        console.error("Erro ao executar as seeds:", error);
    }
    finally {
        await AppDataSource.destroy();
        console.log("conexão encerrada com sucesso!");
    }
};
runSeeds();
//# sourceMappingURL=run-seeds.js.map