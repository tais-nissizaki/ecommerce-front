import { Component, OnInit } from "@angular/core";
import { Produto } from "src/app/shared/models/produto";
import { ItemCarrinho } from "src/app/shared/models/ItemCarrinho";
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CarrinhosService } from 'src/app/core/carrinhos.service';
import { ConfigParams as ConfigParams } from 'src/app/shared/models/config-prams';

@Component({
  selector: "tco-listagem-carrinho",
  templateUrl: "./listagem-carrinho.component.html",
  styleUrls: ["./listagem-carrinho.component.scss"],
})
export class ListagemCarrinhoComponent implements OnInit {
  listagemCarrinho: FormGroup;

  produtosCarrinho: MatTableDataSource<ItemCarrinho>;

  displayedColumns: string[] = ["urlFoto", "nome", "valor", "quantidade", "valorTotal", "remover"];
  config: ConfigParams = {
    pagina: 0,
    limite: 100
  };

  constructor(private carrinhoService: CarrinhosService,
              private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.listagemCarrinho = this._formBuilder.group({
      cupom: ['']
    });
    this.produtosCarrinho = new MatTableDataSource([]);
    this.carrinhoService.listar(this.config)
        .subscribe(carrinho => {
          alert(carrinho.itensDeCarrinho.length);
          this.produtosCarrinho = new MatTableDataSource(
            carrinho.itensDeCarrinho.map(ic => new ItemCarrinho(ic.produto, ic.quantidade))
          );
        });
    // this.produtosCarrinho = new MatTableDataSource([
    //   new ItemCarrinho(
    //     {
    //       id: 3,
    //       nome: "Buquê de Girassóis e Rosas",
    //       urlFoto: "assets/images/buqueGirassolRosa.jpg",
    //       descricao: "Buquê de girassóis e rosas vermelhas com ",
    //       valor: 149.9,
    //       dimensoes: {
    //         largura: "50 cm",
    //         altura: "35 cm",
    //         diametro: "50 cm",
    //       },
    //       ativo: true,
    //       categoria: "Buques",
    //     },
    //     1
    //   ),
    //   new ItemCarrinho(
    //     {
    //       id: 10,
    //       nome: "Arranjo de rosas amarelas",
    //       urlFoto: "assets/images/rosas.jpg",
    //       descricao: "Arranjo de rosas amarelas",
    //       valor: 75.0,
    //       dimensoes: {
    //         largura: "11 cm",
    //         altura: "17 cm",
    //         diametro: "11 cm",
    //       },
    //       ativo: true,
    //       categoria: "Arranjos",
    //     },
    //     1
    //   ),
    // ]);
    
  }

  get desconto(){
    const itens = this.produtosCarrinho.data;
    return itens && itens.length > 0 ? itens.map(item => item.valorTotal).reduce((sum, current) => sum+current) * 0.1 : 0.0;
  }

  get totalCarrinho(){
    const itens = this.produtosCarrinho.data;
    return itens && itens.length > 0 ? itens.map(item => item.valorTotal).reduce((sum, current) => sum+current) - this.desconto : 0.00;
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
