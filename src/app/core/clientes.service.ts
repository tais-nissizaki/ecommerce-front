import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cliente } from '../shared/models/cliente';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:8080/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private readonly _clientes = new BehaviorSubject<Cliente[]>([]);

  readonly clientes$ = this._clientes.asObservable();

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(url, cliente);
  }

  editar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(url + cliente.id, cliente);
  }

  listar(config: ConfigPrams): Observable<Cliente[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Cliente[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(url + id);
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(url + id,{});
  }

  get clientes(): Cliente[] {
    return this._clientes.getValue();
  }

  set clientes(clientes: Cliente[]) {
    this._clientes.next(clientes);
  }

  addClientes(clientes: Cliente[]) {
    this.clientes = [
      ...this.clientes.concat(clientes), 
    ]
  }

  limparClientes() {
    this.clientes = [];
  }
}