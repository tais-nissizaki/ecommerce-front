import { Telefone } from './telefone';
import { Usuario } from './usuario';
import { Endereco } from './endereco';
import { Pessoa } from './pessoa';

export interface Cliente {
  id?: 1;
  usuario: Usuario;
  nome: Pessoa;
  genero: string;
  ativo: boolean;
  cpf: string;
  dtNasc: Date;
  telefone: Telefone[];
  endereco: Endereco[];
}
