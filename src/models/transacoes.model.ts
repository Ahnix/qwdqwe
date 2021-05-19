import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Transacoes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'any',
    required: true,
  })
  valor: any;

  @property({
    type: 'date',
    required: true,
  })
  dataTransacao: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Transacoes>) {
    super(data);
  }
}

export interface TransacoesRelations {
  // describe navigational properties here
}

export type TransacoesWithRelations = Transacoes & TransacoesRelations;
