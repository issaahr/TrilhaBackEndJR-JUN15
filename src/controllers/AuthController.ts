import { Request, Response } from 'express';
import { User } from '../data/entities';
import { UserRepository } from '../data/repositories/userRepository';
import { BadRequestError, UnauthorizedError } from '../errors';
import { JwtService } from '../services/jwtService';
import { ILoginSucess } from './../models/Interfaces/ILoginSucess';

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Autenticação de usuário
 *     tags: [Auth]
 *     description: Gera e retorna um token JWT para autenticação do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@taskmanager.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "4546546541"
 *     responses:
 *       '200':
 *         description: Login realizado com sucesso. Retorna um token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login realizado com sucesso."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsIn..."
 *
 *       '400':
 *         description: Requisição inválida (faltando email ou senha).
 *       '401':
 *         description: Credenciais inválidas.
 */
export class AuthController {
  public async login(req: Request, res: Response): Promise<Response<ILoginSucess>> {
    const { email, password } = req.body;

    if (!email || !password) throw new BadRequestError('Email e senha são obrigatórios');

    const userRepository = new UserRepository();
    const user: User = await userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedError('Email ou senha inválidos');

    const isPasswordCorrect = await userRepository.validatePassword(user, password);
    if (!isPasswordCorrect) throw new UnauthorizedError('Email ou senha inválidos');

    const token: ILoginSucess = JwtService.generateToken({ id: user.id });
    return res.status(200).json(token);
  }
}
