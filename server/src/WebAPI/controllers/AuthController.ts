import { Request, Response, Router } from 'express';
import { IAuthService } from '../../Domain/services/auth/IAuthService';
import { dataValidationAuth } from '../validators/auth/RegisterValidator';
import jwt from "jsonwebtoken";

export class AuthController {
  private router: Router;
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.router = Router();
    this.authService = authService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/auth/login', this.login.bind(this));
    this.router.post('/auth/register', this.registration.bind(this));
  }

  /**
   * POST /api/v1/auth/login
   * Prijava korisnika
   */
  private async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      // Validacija input parametara
      const rezultat = dataValidationAuth(username, password);

      if (!rezultat.success) {
        res.status(400).json({ success: false, message: rezultat.message });
        return;
      }

      const result = await this.authService.login(username, password);

      // Proveravamo da li je prijava uspešna
      if (result.id !== 0) {
        // Kreiranje jwt tokena
        const token = jwt.sign(
          { 
            id: result.id, 
            korisnickoIme: result.username, 
            uloga: result.role,
          }, process.env.JWT_SECRET ?? "", { expiresIn: '6h' });

        res.status(200).json({success: true, message: 'Login succesfull', data: token});
        return;
      } else {
        res.status(401).json({success: false, message: 'Incorrect username or password'});
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({success: false, message: error});
    }
  }

  /**
   * POST /api/v1/auth/register
   * Registracija novog korisnika
   */
  private async registration(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, role } = req.body;
      const rezultat = dataValidationAuth(username, password);

      if (!rezultat.success) {
        res.status(400).json({ success: false, message: rezultat.message });
        return;
      }

      const result = await this.authService.registration(username, role, password);
      
      // Proveravamo da li je registracija uspešna
      if (result.id !== 0) {
        // Kreiranje jwt tokena
        const token = jwt.sign(
          { 
            id: result.id, 
            username: result.username, 
            role: result.role,
          }, process.env.JWT_SECRET ?? "", { expiresIn: '6h' });


        res.status(201).json({success: true, message: 'Registration succesfull', data: token});
      } else {
        res.status(401).json({success: false, message: 'Registration failed. Username  is already in use.', });
      }
    } catch (error) {
      res.status(500).json({success: false, message: error});
    }
  }

  /**
   * Getter za router
   */
  public getRouter(): Router {
    return this.router;
  }
}