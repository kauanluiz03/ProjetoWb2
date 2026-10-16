import { DataSource } from "typeorm";
import { Situations } from "../entity/Situations.js";
export default class CreateSituationSeeds {
    async run(dataSource) {
        console.log("Iniciando a criação de seeds para a tabela 'situations'...");
        const situationRepository = dataSource.getRepository(Situations);
        const existingSituations = await situationRepository.count();
        if (existingSituations > 0) {
            console.log("a tabela 'situations' já possui dados. Nenhuma alteração foi realizada.");
            return;
        }
        const situations = [
            { nameSituation: "Ativo" },
            { nameSituation: "Inativo" },
            { nameSituation: "Pendente" },
        ];
        await situationRepository.save(situations);
        console.log("Seeds para a tabela 'situations' criadas com sucesso!");
    }
}
//# sourceMappingURL=CreateSituationSeeds.js.map