import jwt from "jsonwebtoken";

const generarJWT = (id) =>
  jwt.sign(
    {
    },
    "palabra",
    {
      expiresIn: "1d",
    }
  );

export const generarId = () =>
  Date.now().toString(32) + Math.random().toString(32).substring(2);
