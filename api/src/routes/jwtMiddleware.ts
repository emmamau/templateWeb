import { Request, Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";

declare global {
  namespace Express {
    interface Request {
      token?: Jwt | JwtPayload | string;
    }
  }
}

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).type("json").send(JSON.stringify({ message: "Missing or invalid token" }));
    return;
  }

  try {
    const parts = token.split(" ");
    if (parts.length < 2) {
      throw new Error("Malformed authorization header");
    }

    const jwtBearer = parts[1];
    console.log("Authorization: " + jwtBearer);

    const jwtPayload = jwt.verify(jwtBearer, ACCESS_TOKEN_SECRET, {
      complete: true,
      algorithms: ["HS256"],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false
    });

    req.token = jwtPayload;
  } catch (error) {
    console.log(error);
    res.status(401).type("json").send(JSON.stringify({ message: "Missing or invalid token" }));
    return;
  }

  next();
};

export default { checkJwt };
