import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Propiedad = db.define("propiedades", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  habitaciones: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estacionamiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  wc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Propiedad;
