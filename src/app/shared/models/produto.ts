import { Dimensoes } from './dimensoes';

export interface Produto {
  id?: number;
  nome: string;
  urlFoto?: string;
  descricao?: string;
  valor: number;
  dimensoes: Dimensoes;
  ativo?: boolean;
  categoria: string;
}
