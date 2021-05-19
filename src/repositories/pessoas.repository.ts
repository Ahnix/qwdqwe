import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DockDataSource} from '../datasources';
import {Pessoas, PessoasRelations, Contas} from '../models';
import {ContasRepository} from './contas.repository';

export class PessoasRepository extends DefaultCrudRepository<
  Pessoas,
  typeof Pessoas.prototype.id,
  PessoasRelations
> {

  public readonly contas: HasOneRepositoryFactory<Contas, typeof Pessoas.prototype.id>;

  constructor(
    @inject('datasources.dock') dataSource: DockDataSource, @repository.getter('ContasRepository') protected contasRepositoryGetter: Getter<ContasRepository>,
  ) {
    super(Pessoas, dataSource);
    this.contas = this.createHasOneRepositoryFactoryFor('contas', contasRepositoryGetter);
    this.registerInclusionResolver('contas', this.contas.inclusionResolver);
  }
}
