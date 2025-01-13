import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarJWT, generarId } from "../helpers/token.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar sesión",
  });
};

const autenticar = async (req, res) => {
  await check("email", "El email es obligatorio")
    .isEmail()
    .withMessage("No es Email")
    .run(req);

  await check("password")
    .notEmpty()
    .withMessage("El password es obligatorio")
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("auth/login", {
      pagina: "Iniciar sesion",
      errores: resultado.array(),
    });
  }

  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.render("auth/login", {
      pagina: "Iniciar sesion",
      errores: [{ msg: "El usuario no existe" }],
    });
  }

  if (!usuario.verificarPassword(password)) {
    return res.render("auth/login", {
      pagina: "Iniciar sesion",
      errores: [{ msg: "Password incorrecto" }],
    });
  }

  //Autenticacion

  const token = generarJWT({ id: usuario.id, nombre: usuario.nombre });

  console.log(token);

  //Almacenar cookie

  return res
    .cookie("_token", token, {
      httpOnly: true,
      secure: true,
    })
    .redirect("/mis-propiedades");
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta",
  });
};

const registrar = async (req, res) => {
  await check("nombre", "El nombre es obligatorio")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await check("email", "El email es obligatorio")
    .isEmail()
    .withMessage("No es Email")
    .run(req);

  await check("password")
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres")
    .run(req);

  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("Los passwords no son iguales")
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  const { nombre, email, password } = req.body;

  const existeUsuario = await Usuario.findOne({
    where: {
      email,
    },
  });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: [
        {
          msg: "Ya tiene una cuenta registrada",
        },
      ],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });
  return res.render("auth/registro", {
    pagina: "Crear cuenta",
    creado: "Usuario creado con exito",
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recuperar contraseña",
  });
};

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  autenticar,
  registrar,
};
