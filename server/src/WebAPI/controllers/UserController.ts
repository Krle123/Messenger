import { Request, Response, Router } from "express";
import { IUserService } from "../../Domain/services/users/IUserService";
import { UserDto } from "../../Domain/DTOs/users/UserDto";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../../Middlewares/authorization/AuthorizeMiddleware";

export class UserController {
  private router: Router;
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.router = Router();
    this.userService = userService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // ostale metode, npr. /api/v1/user/1 <--- user po ID-ju 1
    this.router.get("/users", this.users.bind(this));
    this.router.get("/user", this.getUserById.bind(this));
  }

  /**
   * GET /api/v1/users
   * Svi korisnici
   */
  private async users(req: Request, res: Response): Promise<void> {
    try {
      const usersData: UserDto[] =
        await this.userService.getAllUsers();
      console.log("Users fetched:", usersData);
      res.status(200).json(usersData);
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const userData: UserDto = await this.userService.getUserById(id);

      if (userData) {
        res.status(200).json(userData);
        return;
      }
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
  private async ContactList(req: Request, res: Response): Promise<void> 
  {
    try {
      const { role } = req.body;
      const result = await this.userService.getAllRole(role);
      if(result.length > 0) {
        res.status(200).json({ success: true, message: 'Contact list fetched successfully', data: result });
        return;
      }
      res.status(200).json({ success: true, message: 'No contacts found', data: result });
      return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  /**
   * Getter za router
   */
  public getRouter(): Router {
    return this.router;
  }
}
