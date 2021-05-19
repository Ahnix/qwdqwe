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
import {Pessoas} from '../models';
import {PessoasRepository} from '../repositories';

export class PessoasController {
  constructor(
    @repository(PessoasRepository)
    public pessoasRepository : PessoasRepository,
  ) {}

  @post('/pessoas')
  @response(200, {
    description: 'Pessoas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pessoas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pessoas, {
            title: 'NewPessoas',
            
          }),
        },
      },
    })
    pessoas: Pessoas,
  ): Promise<Pessoas> {
    return this.pessoasRepository.create(pessoas);
  }

  @get('/pessoas/count')
  @response(200, {
    description: 'Pessoas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pessoas) where?: Where<Pessoas>,
  ): Promise<Count> {
    return this.pessoasRepository.count(where);
  }

  @get('/pessoas')
  @response(200, {
    description: 'Array of Pessoas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pessoas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pessoas) filter?: Filter<Pessoas>,
  ): Promise<Pessoas[]> {
    return this.pessoasRepository.find(filter);
  }

  @patch('/pessoas')
  @response(200, {
    description: 'Pessoas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pessoas, {partial: true}),
        },
      },
    })
    pessoas: Pessoas,
    @param.where(Pessoas) where?: Where<Pessoas>,
  ): Promise<Count> {
    return this.pessoasRepository.updateAll(pessoas, where);
  }

  @get('/pessoas/{id}')
  @response(200, {
    description: 'Pessoas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pessoas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pessoas, {exclude: 'where'}) filter?: FilterExcludingWhere<Pessoas>
  ): Promise<Pessoas> {
    return this.pessoasRepository.findById(id, filter);
  }

  @patch('/pessoas/{id}')
  @response(204, {
    description: 'Pessoas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pessoas, {partial: true}),
        },
      },
    })
    pessoas: Pessoas,
  ): Promise<void> {
    await this.pessoasRepository.updateById(id, pessoas);
  }

  @put('/pessoas/{id}')
  @response(204, {
    description: 'Pessoas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pessoas: Pessoas,
  ): Promise<void> {
    await this.pessoasRepository.replaceById(id, pessoas);
  }

  @del('/pessoas/{id}')
  @response(204, {
    description: 'Pessoas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pessoasRepository.deleteById(id);
  }
}
