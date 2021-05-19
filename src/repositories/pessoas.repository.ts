import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DockDataSource} from '../datasources';
import {Pessoas, PessoasRelations} from '../models';

export class PessoasRepository extends DefaultCrudRepository<
  Pessoas,
  typeof Pessoas.prototype.id,
  PessoasRelations
> {
  constructor(
    @inject('datasources.dock') dataSource: DockDataSource,
  ) {
    super(Pessoas, dataSource);
  }
}
