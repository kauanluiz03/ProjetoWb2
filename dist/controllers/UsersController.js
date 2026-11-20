import express, {} from 'express';
import { AppDataSource } from '../data-source.js';
import { Users } from '../entity/Users.js';
import { Situations } from '../entity/Situations.js';
import { PaginationServices } from '../services/PaginationServices.js';
import { Not } from 'typeorm';
import * as yup from 'yup';
const router = express.Router();
// listar usuários (com paginação)
router.get("/", async (req, res) => {
    try {
        const repository = AppDataSource.getRepository(Users);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationServices.paginate(repository, page, limit, { id: "DESC" });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ messagem: "Erro ao listar usuários" });
    }
});
// visualizar um usuário (já traz a situação)
router.get("/:id", async (req, res) => {
    try {
        const repository = AppDataSource.getRepository(Users);
        const { id } = req.params;
        const user = await repository.findOne({
            where: { id: parseInt(id) },
            relations: { situation: true },
        });
        if (!user) {
            res.status(404).json({ messagem: "Usuário não encontrado" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ messagem: "Erro ao visualizar usuário" });
    }
});
// cadastrar usuário
// body: { "name": "Maria", "email": "maria@email.com", "situation": 1 }
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const schema = yup.object().shape({
            name: yup.string()
                .required("O campo name é obrigatório")
                .min(3, "O campo name deve ter no mínimo 3 caracteres"),
            email: yup.string()
                .email("E-mail inválido")
                .required("O campo e-mail é obrigatório"),
            situation: yup.number()
                .required("O campo situação é obrigatório"),
        });
        await schema.validate(data, { abortEarly: false });
        const UserRepository = AppDataSource.getRepository(Users);
        const existingUser = await UserRepository.findOne({
            where: { email: data.email }
        });
        if (existingUser) {
            res.status(400).json({ messagem: "Este e-mail já está cadastrado" });
            return;
        }
        const newUser = UserRepository.create(data);
        await UserRepository.save(newUser);
        res.status(201).json({
            messagem: "Usuário cadastrado com sucesso",
            user: newUser,
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({ messagem: error.errors });
            return;
        }
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ messagem: "Erro ao cadastrar usuário" });
    }
});
// atualizar usuário (envie só os campos que quer mudar)
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const schema = yup.object().shape({
            name: yup.string()
                .required("O campo name é obrigatório")
                .min(3, "O campo name deve ter no mínimo 3 caracteres"),
            email: yup.string()
                .email("E-mail inválido")
                .required("O campo e-mail é obrigatório"),
            situation: yup.number()
                .required("O campo situação é obrigatório"),
        });
        await schema.validate(data, { abortEarly: false });
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        if (!user) {
            res.status(404).json({ messagem: "Usuário não encontrado" });
            return;
        }
        const existingUser = await userRepository.findOne({
            where: {
                email: data.email,
                id: Not(parseInt(id)),
            },
        });
        if (existingUser) {
            res.status(400).json({ messagem: "Usuário já está cadastrado com este nome" });
            return;
        }
        userRepository.merge(user, data);
        const updatedUser = await userRepository.save(user);
        res.status(200).json({
            messagem: "Usuário atualizado com sucesso",
            user: updatedUser,
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({ messagem: error.errors });
            return;
        }
        res.status(500).json({ messagem: "Erro ao atualizar usuário" });
    }
});
// apagar usuário
router.delete("/:id", async (req, res) => {
    try {
        // Obter o ID do usuário a partir dos parâmetros da requisição
        const { id } = req.params;
        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(Users);
        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        // Verificar se o usuário foi encontrado
        if (!user) {
            res.status(404).json({ messagem: "Usuário não encontrado" });
            return;
        }
        // Remover o usuário do banco de dados
        await userRepository.remove(user);
        // Retornar resposta de sucesso
        res.status(200).json({
            messagem: "Usuário apagado com sucesso"
        });
    }
    catch (error) {
        res.status(500).json({ messagem: "Erro ao remover usuário" });
    }
});
export default router;
//# sourceMappingURL=UsersController.js.map