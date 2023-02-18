import mysql from "../../../config/mysqlconnection.js";
import productosRaw from "./productos.js";

const nombreTabla = "productos";
const tablacb = (tabla) => {
  tabla.increments("id").primary();

  tabla.string("nombre", 50).notNullable();
  tabla.string("descripcion", 150).notNullable();
  tabla.integer("codigo").notNullable().unique();
  tabla.integer("precio").notNullable();
  tabla.string("foto").notNullable();
  tabla.integer("stock").notNullable();

  tabla.timestamp('created_at').defaultTo(mysql.fn.now());
  tabla.timestamp('updated_at').defaultTo(mysql.fn.now());
}

const crearTablasProductos = async () => {
  try {
    const exists = await mysql.schema.hasTable(nombreTabla);
    if (exists) await mysql.schema.dropTable(nombreTabla);  // Podría subirlo para evitar poner to.do de nuevo sin que se pierdan los datos cada vez que iniciamos el server

    // Crear la tabla
    await mysql.schema.createTable(nombreTabla, tablacb);

    // Insertar productos
    await mysql.from(nombreTabla).insert(productosRaw);
  } catch (error) {
    console.log(`Ha ocurrido un error ${error}`);
  }
}

export default crearTablasProductos;



