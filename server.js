import app, {io, httpServer, PORT} from "./src/config/init.js";
import routerProductos from "./src/controller/productos.js";
import {connectionEvent} from "./src/websockets/websocketsCallbacks.js";
import crearTablasProductos from "./src/utils/Inicio/Productos/crearTablasProductos.js";
import crearTablasMensajes from "./src/utils/Inicio/Mensajes/crearTablasMensajes.js";

(async () => {
  try {
    await crearTablasProductos();
    await crearTablasMensajes();
    console.log("Tablas creadas y cargadas con datos");
  } catch (error) {
    console.log(`Ha ocurrido un error al crear las tablas: ${error}`);
  }
}
)();

// Rutas principales
app.get('/', (req, res) => {
    res.render('templates/chat');
});

app.use('/productos', routerProductos);

const servidor = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${servidor.address().port}`);
});
servidor.on("error", error => console.log(`Encontramos el siguiente error en el servidor: ${error}`));

//Sockets
io.on('connection', connectionEvent);
