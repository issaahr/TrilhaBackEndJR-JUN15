import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { BaseEntityRepository } from './baseEntityRepository';

/**
 * Repositório para gerenciar operações relacionadas a usuários no banco de dados.
 *
 * @extends {BaseEntityRepository<User>}
 *
 * @remarks
 * Este repositório estende o repositório base e adiciona funcionalidades específicas
 * para autenticação e busca de usuários.
 *
 */
export class UserRepository extends BaseEntityRepository<User> {
  /** Repositório TypeORM específico para a entidade User */
  private userRepository: Repository<User>;

  /**
   * Inicializa um novo repositório de usuários.
   *
   * @remarks
   * O construtor configura tanto o repositório base quanto o repositório
   * específico para usuários.
   */
  constructor() {
    super(User);
    this.userRepository = this.repository as Repository<User>;
  }

  /**
   * Busca um usuário pelo seu endereço de email.
   *
   * @param email - Endereço de email do usuário
   * @returns Promise com o usuário encontrado ou null se não existir
   *
   */
  public findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Valida a senha de um usuário.
   *
   * @param user - Usuário cuja senha será validada
   * @param password - Senha em texto plano para validação
   * @returns Promise que resolve para true se a senha estiver correta, false caso contrário
   *
   */
  public validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
