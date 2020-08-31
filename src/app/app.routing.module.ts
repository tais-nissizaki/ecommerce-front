import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosModule } from './produtos/produtos.module';
import { CadastroProdutosComponent } from './produtos/cadastro-produtos/cadastro-produtos.component';
import { ListagemProdutosComponent } from './produtos/listagem-produtos/listagem-produtos.component';
import { VisualizarProdutosComponent } from './produtos/visualizar-produtos/visualizar-produtos.component';
import { CheckoutModule } from './checkout/checkout.module';
import { CarrinhoComponent } from './checkout/carrinho/carrinho.component';
import { ClienteComponent } from './perfil/cliente/cliente.component';
import { PerfilModule } from './perfil/perfil.module';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'produtos',
      pathMatch: 'full'
  },
  {
    path: 'produtos',
    children: [
      {
        path: '',
        component: ListagemProdutosComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroProdutosComponent
          },
          {
            path: ':id',
            component: CadastroProdutosComponent
          }
        ]
      },
      {
        path: ':id',
        component: VisualizarProdutosComponent,
        pathMatch: 'full'
      },
      
    ]
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  { path: '**', redirectTo: 'produtos' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProdutosModule,
    CheckoutModule,
    PerfilModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
