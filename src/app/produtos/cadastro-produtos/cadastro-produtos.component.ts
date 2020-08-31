import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Produto } from 'src/app/shared/models/produto';
import { ProdutosService } from 'src/app/core/produtos.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'tco-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss']
})
export class CadastroProdutosComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  categorias: Array<string>;

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private produtoService: ProdutosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.produtoService.visualizar(this.id)
        .subscribe((produto: Produto) => this.criarFormulario(produto));
    } else {
      this.criarFormulario(this.criarProdutoEmBranco());
    }

    this.categorias = ['Arranjos', 'Buquês', 'Vasos', 'Kits', 'Cestas'];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const produto = this.cadastro.getRawValue() as Produto;
    if (this.id) {
      produto.id = this.id;
      this.editar(produto);
    } else {
      this.salvar(produto);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(produto: Produto): void {
    this.cadastro = this.fb.group({
      nome: [produto.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [produto.urlFoto, [Validators.minLength(10)]],
      descricao: [produto.descricao],
      valor: [produto.valor, [Validators.required, Validators.min(0)]],
      altura: [produto.dimensoes.altura, [Validators.required]],
      largura: [produto.dimensoes.largura, [Validators.required]],
      diametro: [produto.dimensoes.diametro, [Validators.required]],
      categoria: [produto.categoria, [Validators.required]]
    });
  }

  private criarProdutoEmBranco(): Produto {
    return {
      nome: null,
      urlFoto: null,
      descricao: null,
      valor: null,
      categoria: null,
      dimensoes: null
    } as Produto;
  }

  private salvar(produto: Produto): void {
    this.produtoService.salvar(produto).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo produto',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('produtos');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(produto: Produto): void {
    this.produtoService.editar(produto).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('produtos'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
