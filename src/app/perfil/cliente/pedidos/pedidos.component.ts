import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemCarrinho } from 'src/app/shared/models/ItemCarrinho';

@Component({
  selector: 'tco-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  produtosCarrinho: MatTableDataSource<ItemCarrinho>;

  displayedColumns: string[] = ["urlFoto", "nome", "valor", "quantidade", "valorTotal"];

  constructor() { }

  ngOnInit() {
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
}
