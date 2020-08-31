import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ProdutosService } from 'src/app/core/produtos.service';
import { Produto } from 'src/app/shared/models/produto';
import { ConfigPrams } from 'src/app/shared/models/config-prams';

@Component({
  selector: 'tco-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.scss']
})
export class ListagemProdutosComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };
  filtrosListagem: FormGroup;
  categorias: Array<string>;

  constructor(private produtosService: ProdutosService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      categoria: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('categoria').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'categoria', valor: val};
      this.resetarConsulta();
    });

    this.categorias = ['Arranjos', 'Buquês', 'Vasos', 'Kits', 'Cestas'];

    this.listarProdutos();
  }

  onScroll(): void {
    this.listarProdutos();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/produtos/' + id);
  }

  adicionarAoCarrinho(id: number) {
    this.router.navigateByUrl('/carrinho');
  }

  private listarProdutos(): void {
    this.config.pagina++;
    this.produtosService.listar(this.config)
      .subscribe((produtos: Produto[]) => this.produtos.push(...produtos));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    // this.produtos = [];
    this.listarProdutos();
  }

  get produtos() {
    return this.produtosService.produtos;
  }
}