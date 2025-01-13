import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import propiedadRoutes from "./routes/propiedadRoutes.js";
import db from "./config/db.js";

// App
const app = express();

// Habilitar lectura forms

app.use(express.urlencoded({ extended: true }));

// Database

try {
  await db.authenticate();
  db.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Static files

app.use(express.static("public"));

// Routes
app.use("/auth", usuarioRoutes);
app.use("/", propiedadRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
