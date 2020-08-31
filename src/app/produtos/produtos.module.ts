import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemProdutosComponent } from './listagem-produtos/listagem-produtos.component';
import { CamposModule } from '../shared/components/campos/campos.module';
import { VisualizarProdutosComponent } from './visualizar-produtos/visualizar-produtos.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [CadastroProdutosComponent, ListagemProdutosComponent, VisualizarProdutosComponent]
})
export class ProdutosModule { }
