import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUND = process.env.SALT_ROUND;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const hashPayload = async (data: string) => {
  const salt = Number(SALT_ROUND);
  if (isNaN(salt)) {
    throw new Error("Invalid SALT environment variable");
  }
  return await bcrypt.hash(data, Number(SALT_ROUND));
};

export const compareHash = async (payload: string, hashedPayload: string) => {
  return await bcrypt.compare(payload, hashedPayload);
};

export const generateAccessToken = async (userId: string) => {
  const payload = { userId };
  return jwt.sign(payload, JWT_SECRET);
};
