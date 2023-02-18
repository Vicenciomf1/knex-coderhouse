import sqlite from "../../../config/sqliteconnection.js";
import mensajesRaw from "./mensajes.js";

const nombreTabla = "mensajes";
const tablacb = (tabla) => {
  tabla.increments("id").primary();

  tabla.string("email", 50).notNullable();
  tabla.string("text", 150).notNullable();

  tabla.timestamp('created_at').defaultTo(sqlite.fn.now());  // Luego lo devuelve como string, acá puedes formatearlo
  tabla.timestamp('updated_at').defaultTo(sqlite.fn.now());
};

const crearTablasMensajes = async () => {
  try {
    const exists = await sqlite.schema.hasTable(nombreTabla);
    if (exists) await sqlite.schema.dropTable(nombreTabla);

    // Crear la tabla
    await sqlite.schema.createTable(nombreTabla, tablacb);

    // Insertar productos
    await sqlite.from(nombreTabla).insert(mensajesRaw);
  } catch (error) {
    console.log(`Ha ocurrido un error ${error}`);
  }
}

export default crearTablasMensajes;
