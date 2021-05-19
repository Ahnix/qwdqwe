import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Transacoes} from '../models';
import {TransacoesRepository} from '../repositories';

export class TransacoesController {
  constructor(
    @repository(TransacoesRepository)
    public transacoesRepository : TransacoesRepository,
  ) {}

  @post('/transacoes')
  @response(200, {
    description: 'Transacoes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Transacoes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacoes, {
            title: 'NewTransacoes',
            
          }),
        },
      },
    })
    transacoes: Transacoes,
  ): Promise<Transacoes> {
    return this.transacoesRepository.create(transacoes);
  }

  @get('/transacoes/count')
  @response(200, {
    description: 'Transacoes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Transacoes) where?: Where<Transacoes>,
  ): Promise<Count> {
    return this.transacoesRepository.count(where);
  }

  @get('/transacoes')
  @response(200, {
    description: 'Array of Transacoes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Transacoes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Transacoes) filter?: Filter<Transacoes>,
  ): Promise<Transacoes[]> {
    return this.transacoesRepository.find(filter);
  }

  @patch('/transacoes')
  @response(200, {
    description: 'Transacoes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacoes, {partial: true}),
        },
      },
    })
    transacoes: Transacoes,
    @param.where(Transacoes) where?: Where<Transacoes>,
  ): Promise<Count> {
    return this.transacoesRepository.updateAll(transacoes, where);
  }

  @get('/transacoes/{id}')
  @response(200, {
    description: 'Transacoes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Transacoes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Transacoes, {exclude: 'where'}) filter?: FilterExcludingWhere<Transacoes>
  ): Promise<Transacoes> {
    return this.transacoesRepository.findById(id, filter);
  }

  @patch('/transacoes/{id}')
  @response(204, {
    description: 'Transacoes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacoes, {partial: true}),
        },
      },
    })
    transacoes: Transacoes,
  ): Promise<void> {
    await this.transacoesRepository.updateById(id, transacoes);
  }

  @put('/transacoes/{id}')
  @response(204, {
    description: 'Transacoes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transacoes: Transacoes,
  ): Promise<void> {
    await this.transacoesRepository.replaceById(id, transacoes);
  }

  @del('/transacoes/{id}')
  @response(204, {
    description: 'Transacoes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transacoesRepository.deleteById(id);
  }
}
