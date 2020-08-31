import { Produto } from './produto';

export class ItemCarrinho {
    produto: Produto;
    quantidade: number;

    constructor(produto: Produto, quantidade: number) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    get valorTotal() {
        return this.produto.valor * this.quantidade;
    }

}