import { ItemCarrinho } from './ItemCarrinho';

export interface Carrinho {
  id?: number;
  idCliente?: number;
  itensDeCarrinho?: ItemCarrinho[];
}
