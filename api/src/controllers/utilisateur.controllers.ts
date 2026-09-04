import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";
import db from "../models";

export interface UserTokenPayload {
  id: string;
  name: string;
  email?: string | null;
}

export function generateAccessToken(user: UserTokenPayload): string {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "1800s" });
}

const Utilisateurs = db.utilisateurs;

export const login = async (req: Request, res: Response): Promise<void> => {
  const loginInput = req.body.login;
  const passwordInput = req.body.password;

  const pattern = /^[A-Za-z0-9]{1,20}$/;
  if (
    typeof loginInput === "string" &&
    typeof passwordInput === "string" &&
    pattern.test(loginInput) &&
    pattern.test(passwordInput)
  ) {
    try {
      const data = await Utilisateurs.findOne({ where: { login: loginInput } });

      if (data) {
        const user: UserTokenPayload = {
          id: data.id,
          name: data.nom,
          email: data.email
        };

        const accessToken = generateAccessToken(user);
        res.setHeader("Authorization", `Bearer ${accessToken}`);
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Utilisateur with login=${loginInput}.`
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(400).send({
        message: "Error retrieving Utilisateur with login=" + loginInput + ": " + message
      });
    }
  } else {
    res.status(400).send({
      message: "Login ou password incorrect"
    });
  }
};

export default { login, generateAccessToken };
