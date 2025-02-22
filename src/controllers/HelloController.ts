import { Request, Response } from 'express';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Hello
 *     tags: [Hello]
 *     description: Retorna uma mensagem de Hello
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *           description: 'requisição executada com sucesso'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: boolean
 *                   data:
 *                     type: object
 *                     description: 'objeto json de retorno'
 */
export class HelloController {
  public Hello(req: Request, res: Response): Response {
    return res.status(200).send('Hello');
  }
}
