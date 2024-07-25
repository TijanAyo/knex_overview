import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { AuthService } from "../services";

@injectable()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  public async register(req: Request, res: Response) {}

  public async login(req: Request, res: Response) {}
}
