import jwt from 'jsonwebtoken';
import { ILoginSucess } from 'models';
export class JwtService {
  private static readonly secret: string = process.env.JWT_SECRET;
  private static readonly expiresIn: string = process.env.JWT_EXPIRES_IN;

  /**
   * Gera um token de autenticação
   * @param payload - Os dados que serão usados para gerar o token
   * @returns - O token gerado
   */
  public static generateToken(payload: object): ILoginSucess {
    const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    return {
      message: 'Login efetuado com sucesso',
      token
    };
  }

  /**
   * Verifica se um token é válido
   * @param token - O token a ser verificado
   * @returns - O payload do token se ele for válido, caso contrário, null
   */
  public static verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null;
    }
  }
}
