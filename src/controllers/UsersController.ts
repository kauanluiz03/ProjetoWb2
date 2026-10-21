import express, { type Request, type Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Users } from '../entity/Users.js';
import { Situations } from '../entity/Situations.js';
import { PaginationServices } from '../services/PaginationServices.js';

const router = express.Router();

// listar usuários (com paginação)
router.get("/", async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(Users);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationServices.paginate(repository, page, limit, { id: "DESC" });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ messagem: "Erro ao listar usuários" });
    }
});

// visualizar um usuário (já traz a situação)
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(Users);

        const user = await repository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: { situation: true },
        });

        if (!user) {
            res.status(404).json({ messagem: "Usuário não encontrado" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ messagem: "Erro ao visualizar usuário" });
    }
});

// cadastrar usuário
// body: { "name": "Maria", "email": "maria@email.com", "situation": { "id": 1 } }
router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, email, situation } = req.body ?? {};

        if (!name || !email || !situation?.id) {
            res.status(400).json({ messagem: "Informe name, email e situation.id" });
            return;
        }

        const repository = AppDataSource.getRepository(Users);

        const emailInUse = await repository.findOneBy({ email });
        if (emailInUse) {
            res.status(409).json({ messagem: "Este e-mail já está cadastrado" });
            return;
        }

        const situationExists = await AppDataSource.getRepository(Situations).findOneBy({ id: situation.id });
        if (!situationExists) {
            res.status(404).json({ messagem: "Situação não encontrada" });
            return;
        }

        const newUser = repository.create({ name, email, situation: { id: situation.id } });
        await repository.save(newUser);

        res.status(201).json({
            messagem: "Usuário cadastrado com sucesso",
            user: newUser,
        });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ messagem: "Erro ao cadastrar usuário" });
    }
});

// atualizar usuário (envie só os campos que quer mudar)
router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(Users);
        const user = await repository.findOneBy({ id: parseInt(req.params.id) });

        if (!user) {
            res.status(404).json({ messagem: "Usuário não encontrado" });
            return;
        }

        const { name, email, situation } = req.body ?? {};

        if (email && email !== user.email) {
            const emailInUse = await repository.findOneBy({ email });
            if (emailInUse) {
                res.status(409).json({ messagem: "Este e-mail já está cadastrado" });
                return;
            }
        }

        if (situation?.id) {
            const situationExists = await AppDataSource.getRepository(Situations).findOneBy({ id: situation.id });
            if (!situationExists) {
                res.status(404).json({ messagem: "Situação não encontrada" });
                return;
            }
            user.situation = situationExists;
        }

        if (name) user.name = name;
        if (email) user.email = email;

        const updatedUser = await repository.save(user);

        res.status(200).json({
            messagem: "Usuário atualizado com sucesso",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ messagem: "Erro ao atualizar usuário" });
    }
});

// apagar usuário
router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(Users);
        const user = await repository.findOneBy({ id: parseInt(req.params.id) });

        if (!user) {
            res.status(404).json({ messagem: "Usuário não encontrado" });
            return;
        }

        await repository.remove(user);

        res.status(200).json({ messagem: "Usuário removido com sucesso" });
    } catch (error) {
        res.status(500).json({ messagem: "Erro ao remover usuário" });
    }
});

export default router;