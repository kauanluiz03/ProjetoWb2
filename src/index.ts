import express  from 'express'; 

import dotenv from "dotenv";
dotenv.config();

const app = express();

import login from "./controllers/login.js";



app.use('/', login);


app.listen(8080 , () => {
    console.log('Servidor rodando na porta 8080: http://localhost:8080');
});