import express, {} from 'express';
const router = express.Router();
router.get("/test-connection", (req, res) => {
    res.status(200).json({ message: "Conexão com a API realizada com sucesso!" });
});
export default router;
//# sourceMappingURL=TesteConectionController.js.map