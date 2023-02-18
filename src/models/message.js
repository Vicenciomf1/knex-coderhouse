import Contenedor from "./Contenedor.js";
import sqlite from "../config/sqliteconnection.js";

export default new Contenedor(sqlite, "mensajes");