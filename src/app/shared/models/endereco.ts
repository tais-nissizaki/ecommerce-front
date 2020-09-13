import { Cidade } from './cidade';

export interface Endereco {
    id?: number;
    bairro: string;
    cep: string;
    cidade: Cidade;
    descricao: string;
    logradouro: string;
    numero: string;
    observacoes?: string;
    tipoEndereco: string;
    tipoLogradouro: string;
    tipoResidencia: string;
}