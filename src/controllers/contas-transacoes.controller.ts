import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Contas,
  Transacoes,
} from '../models';
import {ContasRepository} from '../repositories';

export class ContasTransacoesController {
  constructor(
    @repository(ContasRepository) protected contasRepository: ContasRepository,
  ) { }

  @get('/contas/{id}/transacoes', {
    responses: {
      '200': {
        description: 'Array of Contas has many Transacoes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transacoes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Transacoes>,
  ): Promise<Transacoes[]> {
    return this.contasRepository.transacoes(id).find(filter);
  }

  @post('/contas/{id}/transacoes', {
    responses: {
      '200': {
        description: 'Contas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transacoes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Contas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacoes, {
            title: 'NewTransacoesInContas',
            exclude: ['id'],
            optional: ['contasId']
          }),
        },
      },
    }) transacoes: Omit<Transacoes, 'id'>,
  ): Promise<Transacoes> {
    return this.contasRepository.transacoes(id).create(transacoes);
  }

  @patch('/contas/{id}/transacoes', {
    responses: {
      '200': {
        description: 'Contas.Transacoes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacoes, {partial: true}),
        },
      },
    })
    transacoes: Partial<Transacoes>,
    @param.query.object('where', getWhereSchemaFor(Transacoes)) where?: Where<Transacoes>,
  ): Promise<Count> {
    return this.contasRepository.transacoes(id).patch(transacoes, where);
  }

  @del('/contas/{id}/transacoes', {
    responses: {
      '200': {
        description: 'Contas.Transacoes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Transacoes)) where?: Where<Transacoes>,
  ): Promise<Count> {
    return this.contasRepository.transacoes(id).delete(where);
  }
}
