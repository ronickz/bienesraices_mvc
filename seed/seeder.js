import categorias from "./categorias.js";
import precios from "./precios.js";
import db from "../config/db.js";
import { Categoria, Precio, Propiedad } from "../models/index.js";

const importarDatos = async () => {
  try {
    await db.authenticate();
    await db.sync();
    await Promise.all([
      Categoria.bulkCreate(categorias),
      Precio.bulkCreate(precios),
    ]);
    console.log("Datos importados");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    await Promise.all([
      Categoria.destroy({ where: {}, truncate: { cascade: true } }),
      Precio.destroy({ where: {}, truncate: { cascade: true } }),
    ]);
    console.log("Datos eliminados");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  await importarDatos();
}
if (process.argv[2] === "-e") {
  await eliminarDatos();
}
