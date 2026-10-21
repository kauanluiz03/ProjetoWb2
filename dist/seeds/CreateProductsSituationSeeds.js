import { DataSource } from "typeorm";
import { ProductSituations } from "../entity/ProductSituations.js";
export default class CreateProductSituationsSeeds {
    async run(dataSource) {
        console.log("Iniciando a criação de seeds para a tabela 'product_situations'...");
        const situationRepository = dataSource.getRepository(ProductSituations);
        const existingSituations = await situationRepository.count();
        if (existingSituations > 0) {
            console.log("a tabela 'product_situations' já possui dados. Nenhuma alteração foi realizada.");
            return;
        }
        const situations = [
            { name: "Ativo" },
            { name: "Inativo" },
            { name: "Pendente" },
        ];
        await situationRepository.save(situations);
        console.log("Seeds para a tabela 'product_situations' criadas com sucesso!");
    }
}
//# sourceMappingURL=CreateProductsSituationSeeds.js.map