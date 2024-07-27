import { Request, Response, NextFunction } from "express";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { Iuser } from "../interfaces";
import { KNEX } from "../db";

const JWT_SECRET = process.env.JWT_SECRET;

declare module "express-serve-static-core" {
  interface Request {
    user?: Iuser;
  }
}

export const Authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          data: null,
          message: "Authentication required, Kindly provide a valid token",
          success: false,
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const user = await KNEX("users").where({ id: decoded.userId }).first();

      if (!user) {
        return res.status(401).json({
          data: null,
          message: "User not found",
          success: false,
        });
      }
      req.user = user;
      next();
    } catch (e) {
      console.error("AuthMiddlewareErr:", e);

      if (e instanceof TokenExpiredError) {
        return res.status(400).json({
          data: null,
          message: "Token expired",
          success: false,
        });
      }

      if (e instanceof JsonWebTokenError) {
        console.log("JSONWEBTokenError: Invalid token signature");
        return res.status(400).json({
          data: null,
          message: "Invalid token",
          success: false,
        });
      }

      return res.status(401).json({
        data: null,
        message: "Invalid token",
        success: false,
      });
    }
  } else {
    return res.status(403).json({
      data: null,
      message: "Authorization required, token is required",
      success: false,
    });
  }
};
