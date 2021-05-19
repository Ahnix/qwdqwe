import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DockDataSource} from '../datasources';
import {Transacoes, TransacoesRelations} from '../models';

export class TransacoesRepository extends DefaultCrudRepository<
  Transacoes,
  typeof Transacoes.prototype.id,
  TransacoesRelations
> {
  constructor(
    @inject('datasources.dock') dataSource: DockDataSource,
  ) {
    super(Transacoes, dataSource);
  }
}
