import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Produto } from '../shared/models/produto';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/produtos/';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly _produtos = new BehaviorSubject<Produto[]>([]);

  readonly produtos$ = this._produtos.asObservable();

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(url, produto);
  }

  editar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(url + produto.id, produto);
  }

  listar(config: ConfigPrams): Observable<Produto[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Produto[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<Produto> {
    return this.http.get<Produto>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

  get produtos(): Produto[] {
    return this._produtos.getValue();
  }

  set produtos(produtos: Produto[]) {
    this._produtos.next(produtos);
  }

  addProdutos(produtos: Produto[]) {
    this.produtos = [
      ...this.produtos.concat(produtos), 
    ]
  }

  limparProdutos() {
    this.produtos = [];
  }
}