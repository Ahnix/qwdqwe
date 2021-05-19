import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DockDataSource} from '../datasources';
import {Contas, ContasRelations} from '../models';

export class ContasRepository extends DefaultCrudRepository<
  Contas,
  typeof Contas.prototype.id,
  ContasRelations
> {
  constructor(
    @inject('datasources.dock') dataSource: DockDataSource,
  ) {
    super(Contas, dataSource);
  }
}
