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
import {Contas} from '../models';
import {ContasRepository} from '../repositories';

export class ContasController {
  constructor(
    @repository(ContasRepository)
    public contasRepository : ContasRepository,
  ) {}

  @post('/contas')
  @response(200, {
    description: 'Contas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contas, {
            title: 'NewContas',
            
          }),
        },
      },
    })
    contas: Contas,
  ): Promise<Contas> {
    return this.contasRepository.create(contas);
  }

  @get('/contas/count')
  @response(200, {
    description: 'Contas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contas) where?: Where<Contas>,
  ): Promise<Count> {
    return this.contasRepository.count(where);
  }

  @get('/contas')
  @response(200, {
    description: 'Array of Contas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contas) filter?: Filter<Contas>,
  ): Promise<Contas[]> {
    return this.contasRepository.find(filter);
  }

  @patch('/contas')
  @response(200, {
    description: 'Contas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contas, {partial: true}),
        },
      },
    })
    contas: Contas,
    @param.where(Contas) where?: Where<Contas>,
  ): Promise<Count> {
    return this.contasRepository.updateAll(contas, where);
  }

  @get('/contas/{id}')
  @response(200, {
    description: 'Contas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Contas, {exclude: 'where'}) filter?: FilterExcludingWhere<Contas>
  ): Promise<Contas> {
    return this.contasRepository.findById(id, filter);
  }

  @patch('/contas/{id}')
  @response(204, {
    description: 'Contas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contas, {partial: true}),
        },
      },
    })
    contas: Contas,
  ): Promise<void> {
    await this.contasRepository.updateById(id, contas);
  }

  @put('/contas/{id}')
  @response(204, {
    description: 'Contas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contas: Contas,
  ): Promise<void> {
    await this.contasRepository.replaceById(id, contas);
  }

  @del('/contas/{id}')
  @response(204, {
    description: 'Contas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contasRepository.deleteById(id);
  }
}
