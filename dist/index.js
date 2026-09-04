import express from 'express';
const app = express();
import login from "./controllers/login.js";
app.use('/', login);
app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080: http://localhost:8080');
});
//# sourceMappingURL=index.js.map