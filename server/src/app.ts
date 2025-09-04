import express from 'express';
import cors from 'cors';
import { IAuthService } from './Domain/services/auth/IAuthService';
import { AuthService } from './Services/auth/AuthService';
import { IUserRepository } from './Domain/repositories/users/IUserRepository';
import { UserRepository } from './Database/repositories/users/UserRepository';
import { AuthController } from './WebAPI/controllers/AuthController';
import { IUserService } from './Domain/services/users/IUserService';
import { UserService } from './Services/users/UserService';
import { UserController } from './WebAPI/controllers/UserController';
import { MessageRepository } from './Database/repositories/messages/MessageRepository';
import { IMsgService } from './Domain/services/msg/IMsgService';
import { MsgService } from './Services/MsgService.ts/MsgService';
import { MsgController } from './WebAPI/controllers/MsgController';
import { IMessageRepository } from './Domain/repositories/messages/IMessageRepository';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Repositories
const userRepository: IUserRepository = new UserRepository();
const messageRepository: IMessageRepository = new MessageRepository();

// Services
const authService: IAuthService = new AuthService(userRepository);
const userService: IUserService = new UserService(userRepository);
const msgService: IMsgService = new MsgService(messageRepository, userRepository);

// WebAPI routes
const authController = new AuthController(authService);
const userController = new UserController(userService);
const msgController = new MsgController(msgService);

// Registering routes
app.use('/api/v1', authController.getRouter());
app.use('/api/v1', userController.getRouter());
app.use('/api/v1/messages', msgController.getRouter());

export default app;