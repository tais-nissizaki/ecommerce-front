import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Carrinho } from '../shared/models/carrinho';
import { ConfigParams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { Produto } from '../shared/models/produto';
import { ItemCarrinho } from '../shared/models/ItemCarrinho';

const url = '/api/carrinho/';

@Injectable({
    providedIn: 'root'
})
export class CarrinhosService {
    private readonly _carrinho = new BehaviorSubject<Carrinho>({});

    readonly carrinho$ = this._carrinho.asObservable();

    constructor(private http: HttpClient,
        private configService: ConfigParamsService) { }

    salvar(carrinho: Carrinho): Observable<Carrinho> {
        return this.http.post<Carrinho>(url, carrinho);
    }

    editar(carrinho: Carrinho): Observable<Carrinho> {
        return this.http.put<Carrinho>(url + carrinho.id, carrinho);
    }

    listar(config: ConfigParams): Observable<Carrinho> {
        const configParams = this.configService.configurarParametros(config);
        return this.http.get<Carrinho>(`${url}?${this.carrinho.id?'idCarrinho='+this.carrinho.id+'&':''}`, { params: configParams });
    }

    visualizar(id: number): Observable<Carrinho> {
        return this.http.get<Carrinho>(url + id);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(url + id);
    }

    get carrinho(): Carrinho {
        return this._carrinho.getValue();
    }

    set carrinho(carrinho: Carrinho) {
        this._carrinho.next(carrinho);
    }

    limparCarrinho() {
        // this.carrinho = {};
    }

    adicionarAoCarrinho(produto: Produto, idCliente?: number, quantidade?: number) {
        const carrinhoObservable = this.http.post<number>(`${url}?${this.carrinho.id?'idCarrinho='+this.carrinho.id+'&':''}idCliente=${idCliente}&qtd=${quantidade ? quantidade : 1}`, produto);
        carrinhoObservable.subscribe((idCarrinho) => {
            if (!this.carrinho.idCliente && !this.carrinho.itensDeCarrinho) {
                this.carrinho = {
                    id: idCarrinho,
                    idCliente: idCliente,
                    itensDeCarrinho: [
                        new ItemCarrinho(produto, 1)
                    ]
                }
                console.log(this.carrinho);
            } else {
                this.carrinho.itensDeCarrinho.push(new ItemCarrinho(produto, 1));
                console.log(this.carrinho);
            }
        });
        return carrinhoObservable;
    }
}