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
    this.router.get("/users", this.users.bind(this));
    this.router.get("/user:id", this.getUserById.bind(this));
    this.router.put("/update", this.updateUser.bind(this));
  }

  private async users(req: Request, res: Response): Promise<void> {
    try {
      const usersData: UserDto[] = await this.userService.getAllUsers();
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
      console.log("User data retrieved:", userData);


      if (userData) {
        res.status(200).json({success: true, message: 'User not found', data: userData});
        return;
      }
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userDto: UserDto = req.body;
      const updatedUser: UserDto = await this.userService.updateUser(userDto);
      if (updatedUser) {
        res.status(200).json({success: true, message: '', data: updatedUser});
        return;
      }
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
