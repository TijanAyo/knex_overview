import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { AuthService } from "../services";

@injectable()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  public async register(req: Request, res: Response) {
    try {
      const response = await this._authService.register(req.body);
      return res.status(201).json(response);
    } catch (e) {
      console.log("registerControllerError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const response = await this._authService.login(req.body);
      return res.status(200).json(response);
    } catch (e) {
      console.log("loginControllerError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }
}
