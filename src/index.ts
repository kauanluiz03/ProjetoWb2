import "reflect-metadata"
import express from 'express'

import dotenv from "dotenv"

import cors from 'cors';
dotenv.config()
import { AppDataSource } from "./data-source.js";

const app = express()

app.use(express.json())

app.use(express.json())

app.use(cors());


import TesteConetionController from "./controllers/TesteConectionController.js";
import AuthController from "./controllers/AuthController.js";
import SituationsController from "./controllers/SituationsController.js";
import ProductSituationsController from "./controllers/ProductSituationsController.js";
import ProductCategoriesController from "./controllers/ProductsCategoriesController.js";
import ProductController from "./controllers/ProductsController.js";
import UsersController from "./controllers/UsersController.js";

app.use('/users', UsersController);
app.use('/product-situations', ProductSituationsController);
app.use('/product-categories', ProductCategoriesController);
app.use('/products', ProductController);
app.use('/', AuthController);
app.use('/situations', SituationsController);
app.use('/', TesteConetionController);


AppDataSource.initialize()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    });