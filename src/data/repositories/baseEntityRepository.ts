import { FindOptionsWhere, Repository } from 'typeorm';
import AppDataSource from '../../config/datasource';
import { BaseEntity } from '../entities';

/**
 * Repositório base genérico que fornece operações CRUD básicas para entidades.
 *
 * @typeParam T - Tipo da entidade que estende BaseEntity
 *
 */
export class BaseEntityRepository<T extends BaseEntity> {
  /** Repositório TypeORM para a entidade específica */
  protected repository: Repository<T>;

  /**
   * Inicializa um novo repositório base para a entidade especificada.
   *
   * @param entity - Classe construtora da entidade
   */
  constructor(entity: new () => T) {
    this.repository = AppDataSource.getRepository(entity);
  }

  /**
   * Cria uma nova instância da entidade.
   *
   * @remarks
   * Este método não persiste a entidade no banco de dados, apenas cria uma nova instância.
   * Para salvar no banco, use o método {@link save}.
   *
   * @param entity - Dados da entidade a ser criada
   * @returns Nova instância da entidade
   *
   */
  public create(entity: T): T {
    return this.repository.create(entity);
  }

  /**
   * Salva uma entidade no banco de dados.
   *
   * @remarks
   * Se a entidade já existir (possuir ID), ela será atualizada.
   * Se não existir, será inserida como um novo registro.
   *
   * @param entity - Entidade a ser salva
   * @returns Promise com a entidade salva
   *
   */
  public save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  /**
   * Busca uma entidade pelo seu ID.
   *
   * @param id - ID da entidade a ser encontrada
   * @returns Promise com a entidade encontrada ou null se não existir
   *
   */
  public findById(id: number): Promise<T | null> {
    return this.repository.findOneBy({
      id: id
    } as FindOptionsWhere<T>);
  }

  /**
   * Retorna todas as entidades do tipo especificado.
   *
   * @remarks
   * Cuidado ao usar este método em tabelas com muitos registros,
   * pois pode impactar a performance.
   *
   * @returns Promise com array de todas as entidades
   *
   */
  public findAll(): Promise<T[]> {
    return this.repository.find();
  }

  /**
   * Remove uma entidade do banco de dados.
   *
   * @param entity - Entidade a ser removida
   * @returns Promise com a entidade removida
   *
   */
  public remove(entity: T): Promise<T> {
    return this.repository.remove(entity);
  }
}
