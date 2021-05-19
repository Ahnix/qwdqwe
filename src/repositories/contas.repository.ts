import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DockDataSource} from '../datasources';
import {Contas, ContasRelations, Transacoes} from '../models';
import {TransacoesRepository} from './transacoes.repository';

export class ContasRepository extends DefaultCrudRepository<
  Contas,
  typeof Contas.prototype.id,
  ContasRelations
> {

  public readonly transacoes: HasManyRepositoryFactory<Transacoes, typeof Contas.prototype.id>;

  constructor(
    @inject('datasources.dock') dataSource: DockDataSource, @repository.getter('TransacoesRepository') protected transacoesRepositoryGetter: Getter<TransacoesRepository>,
  ) {
    super(Contas, dataSource);
    this.transacoes = this.createHasManyRepositoryFactoryFor('transacoes', transacoesRepositoryGetter,);
    this.registerInclusionResolver('transacoes', this.transacoes.inclusionResolver);
  }
}
