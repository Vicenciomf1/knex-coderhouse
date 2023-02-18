import * as dotenv from "dotenv";
import express from "express";
import {Server as HttpServer} from "http";
import {Server as IOServer} from "socket.io";
import {engine} from "express-handlebars";
import {__dirname} from "../utils/dirname.js";
import path from "path";
dotenv.config();

const app = express();
export const PORT = 8080;

// Rutas desde utils
const publicRoot = path.resolve(__dirname, "../../public");
const viewsRoot = path.resolve(__dirname, "../views");
const layoutsDir = path.resolve(__dirname, "../views/layouts");

//Crear cositas para la entrega de websockets
export const httpServer = new HttpServer(app);
export const io = new IOServer(httpServer);

// Para usar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicRoot));

// Para el motor de plantillas
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir
}));
app.set('views', viewsRoot);
app.set('view engine', 'hbs');

export default app;
