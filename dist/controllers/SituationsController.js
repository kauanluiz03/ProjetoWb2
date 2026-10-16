import express, {} from 'express';
import { AppDataSource } from '../data-source.js';
import { Situations } from '../entity/Situations.js';
const router = express.Router();
//criar lista de situações
router.get("/", async (req, res) => {
    try {
        const situationsRepository = AppDataSource.getRepository(Situations);
        const situations = await situationsRepository.find();
        res.status(200).json(situations);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar situações",
        });
        return;
    }
});
//criar a visualização de uma situação específica
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const situationsRepository = AppDataSource.getRepository(Situations);
        const situation = await situationsRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada",
            });
            return;
        }
        res.status(200).json(situation);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar situações",
        });
        return;
    }
});
//cadastrar uma nova situação
router.post("/", async (req, res) => {
    try {
        const situationsRepository = AppDataSource.getRepository(Situations);
        const newSituations = situationsRepository.create(req.body);
        await situationsRepository.save(newSituations);
        res.status(201).json({
            messagem: "Situação cadastrada com sucesso",
            situation: newSituations,
        });
    }
    catch (error) {
        console.error("Erro ao cadastrar situação:", error);
        res.status(500).json({
            messagem: "Erro ao cadastrar situação",
        });
    }
});
//atualizar a situação específica
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const situationsRepository = AppDataSource.getRepository(Situations);
        const situation = await situationsRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada",
            });
            return;
        }
        situationsRepository.merge(situation, data);
        const updatedSituation = await situationsRepository.save(situation);
        res.status(200).json(updatedSituation);
        {
            messagem: "Situação atualizada com sucesso";
        }
        ;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao atualizar situação",
        });
        return;
    }
});
//deletar a situação específica
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const situationsRepository = AppDataSource.getRepository(Situations);
        const situation = await situationsRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada",
            });
            return;
        }
        situationsRepository.remove(situation);
        res.status(200).json();
        {
            messagem: "Situação removida com sucesso";
        }
        ;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao atualizar situação",
        });
        return;
    }
});
export default router;
//# sourceMappingURL=SituationsController.js.map