import { Component, OnInit } from "@angular/core";
import { Produto } from "src/app/shared/models/produto";
import { ItemCarrinho } from "src/app/shared/models/ItemCarrinho";
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: "tco-listagem-carrinho",
  templateUrl: "./listagem-carrinho.component.html",
  styleUrls: ["./listagem-carrinho.component.scss"],
})
export class ListagemCarrinhoComponent implements OnInit {
  listagemCarrinho: FormGroup;

  produtosCarrinho: MatTableDataSource<ItemCarrinho>;

  displayedColumns: string[] = ["urlFoto", "nome", "valor", "quantidade", "valorTotal", "remover"];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.listagemCarrinho = this._formBuilder.group({
      cupom: ['']
    });
    this.produtosCarrinho = new MatTableDataSource([
      new ItemCarrinho(
        {
          id: 3,
          nome: "Buquê de Girassóis e Rosas",
          urlFoto: "assets/images/buqueGirassolRosa.jpg",
          descricao: "Buquê de girassóis e rosas vermelhas com ",
          valor: 149.9,
          dimensoes: {
            largura: "50 cm",
            altura: "35 cm",
            diametro: "50 cm",
          },
          ativo: true,
          categoria: "Buques",
        },
        1
      ),
      new ItemCarrinho(
        {
          id: 10,
          nome: "Arranjo de rosas amarelas",
          urlFoto: "assets/images/rosas.jpg",
          descricao: "Arranjo de rosas amarelas",
          valor: 75.0,
          dimensoes: {
            largura: "11 cm",
            altura: "17 cm",
            diametro: "11 cm",
          },
          ativo: true,
          categoria: "Arranjos",
        },
        1
      ),
    ]);
    
  }

  get desconto(){
    const itens = this.produtosCarrinho.data;
    return itens.map(item => item.valorTotal).reduce((sum, current) => sum+current) * 0.1;
  }

  get totalCarrinho(){
    const itens = this.produtosCarrinho.data;
    return itens.map(item => item.valorTotal).reduce((sum, current) => sum+current) - this.desconto;
  }

  reduzirQuantidade(itemCarrinho: ItemCarrinho) {
    itemCarrinho.quantidade--;
    if(itemCarrinho.quantidade < 1) {
      itemCarrinho.quantidade = 1
    }
  }

  aumentarQuantidade(itemCarrinho: ItemCarrinho) {
    itemCarrinho.quantidade++;
  }

  removerItem(itemCarrinho: ItemCarrinho) {
    const itens = this.produtosCarrinho.data;
    itens.splice(itens.findIndex(p => p.produto.id === itemCarrinho.produto.id), 1);
    this.produtosCarrinho = new MatTableDataSource(itens);
  }
}
