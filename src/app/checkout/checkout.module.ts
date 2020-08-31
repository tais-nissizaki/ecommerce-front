import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CamposModule } from '../shared/components/campos/campos.module';
import { ListagemCarrinhoComponent } from './carrinho/listagem-carrinho/listagem-carrinho.component';
import { IdentificacaoComponent } from './carrinho/identificacao/identificacao.component';
import { EntregaComponent } from './carrinho/entrega/entrega.component';
import { PagamentoComponent } from './carrinho/pagamento/pagamento.component';

@NgModule({
  declarations: [CarrinhoComponent, ListagemCarrinhoComponent, IdentificacaoComponent, EntregaComponent, PagamentoComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CamposModule
  ]
})
export class CheckoutModule { }
