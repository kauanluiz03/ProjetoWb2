import express, {} from 'express';
import { AppDataSource } from '../data-source.js';
import { Products } from '../entity/Products.js';
import { PaginationServices } from '../services/PaginationServices.js';
const router = express.Router();
// listar produtos (com paginação)
router.get("/", async (req, res) => {
    try {
        const repository = AppDataSource.getRepository(Products);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationServices.paginate(repository, page, limit, { id: "DESC" });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ messagem: "Erro ao listar produtos" });
    }
});
// visualizar um produto (já traz situação e categoria)
router.get("/:id", async (req, res) => {
    try {
        const repository = AppDataSource.getRepository(Products);
        const product = await repository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: { productSituation: true, productCategory: true },
        });
        if (!product) {
            res.status(404).json({ messagem: "Produto não encontrado" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ messagem: "Erro ao visualizar produto" });
    }
});
// cadastrar produto
router.post("/", async (req, res) => {
    try {
        const repository = AppDataSource.getRepository(Products);
        const newProduct = repository.create(req.body);
        await repository.save(newProduct);
        res.status(201).json({
            messagem: "Produto cadastrado com sucesso",
            product: newProduct,
        });
    }
    catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        res.status(500).json({ messagem: "Erro ao cadastrar produto" });
    }
});
// atualizar produto
router.put("/:id", async (req, res) => {
    try {
        const repository = AppDataSource.getRepository(Products);
        const product = await repository.findOneBy({ id: parseInt(req.params.id) });
        if (!product) {
            res.status(404).json({ messagem: "Produto não encontrado" });
            return;
        }
        repository.merge(product, req.body);
        const updatedProduct = await repository.save(product);
        res.status(200).json({
            messagem: "Produto atualizado com sucesso",
            product: updatedProduct,
        });
    }
    catch (error) {
        res.status(500).json({ messagem: "Erro ao atualizar produto" });
    }
});
// apagar produto
router.delete("/:id", async (req, res) => {
    try {
        const repository = AppDataSource.getRepository(Products);
        const product = await repository.findOneBy({ id: parseInt(req.params.id) });
        if (!product) {
            res.status(404).json({ messagem: "Produto não encontrado" });
            return;
        }
        await repository.remove(product);
        res.status(200).json({ messagem: "Produto removido com sucesso" });
    }
    catch (error) {
        res.status(500).json({ messagem: "Erro ao remover produto" });
    }
});
export default router;
//# sourceMappingURL=ProductsController.js.map