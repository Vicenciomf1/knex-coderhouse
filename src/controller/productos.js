import { Router } from "express";
import products from "../models/product.js";

const routerProductos = Router();

routerProductos.get('/formularioNuevoProducto', async (req, res) => {
  res.render('templates/formulario');
});

routerProductos.get('/productos', async (req, res) => {
  const productos = await products.getAll();
  res.render('templates/lista', {productos});
});

routerProductos.post('/productos', async (req, res) => {
  const producto = req.body;
  await products.save(producto);
  res.redirect('/productos');
});

export default routerProductos;