import { Router } from "express";
import {
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,
  autenticar,
  registrar,
} from "../controllers/usuarioController.js";

const router = Router();

router.get("/login", formularioLogin);
router.post("/login", autenticar);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/olvide-password", formularioOlvidePassword);

export default router;
