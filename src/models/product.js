import Contenedor from "./Contenedor.js";
import mysqlconnection from "../config/mysqlconnection.js";

export default new Contenedor(mysqlconnection, "productos");
