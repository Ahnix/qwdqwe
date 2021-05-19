import {Entity, model, property, hasOne} from '@loopback/repository';
import {Contas} from './contas.model';

@model({settings: {strict: false}})
export class Pessoas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  cpf: string;

  @property({
    type: 'date',
    required: true,
  })
  dataNascimento: string;

  @hasOne(() => Contas)
  contas: Contas;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pessoas>) {
    super(data);
  }
}

export interface PessoasRelations {
  // describe navigational properties here
}

export type PessoasWithRelations = Pessoas & PessoasRelations;
