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
  Pessoas,
  Contas,
} from '../models';
import {PessoasRepository} from '../repositories';

export class PessoasContasController {
  constructor(
    @repository(PessoasRepository) protected pessoasRepository: PessoasRepository,
  ) { }

  @get('/pessoas/{id}/contas', {
    responses: {
      '200': {
        description: 'Pessoas has one Contas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Contas),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Contas>,
  ): Promise<Contas> {
    return this.pessoasRepository.contas(id).get(filter);
  }

  @post('/pessoas/{id}/contas', {
    responses: {
      '200': {
        description: 'Pessoas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pessoas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contas, {
            title: 'NewContasInPessoas',
            exclude: ['id'],
            optional: ['pessoasId']
          }),
        },
      },
    }) contas: Omit<Contas, 'id'>,
  ): Promise<Contas> {
    return this.pessoasRepository.contas(id).create(contas);
  }

  @patch('/pessoas/{id}/contas', {
    responses: {
      '200': {
        description: 'Pessoas.Contas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contas, {partial: true}),
        },
      },
    })
    contas: Partial<Contas>,
    @param.query.object('where', getWhereSchemaFor(Contas)) where?: Where<Contas>,
  ): Promise<Count> {
    return this.pessoasRepository.contas(id).patch(contas, where);
  }

  @del('/pessoas/{id}/contas', {
    responses: {
      '200': {
        description: 'Pessoas.Contas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Contas)) where?: Where<Contas>,
  ): Promise<Count> {
    return this.pessoasRepository.contas(id).delete(where);
  }
}
