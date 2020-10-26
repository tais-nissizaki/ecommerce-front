import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cliente } from '../shared/models/cliente';
import { ConfigParams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { Usuario } from '../shared/models/usuario';
import { Telefone } from '../shared/models/telefone';
import { Endereco } from '../shared/models/endereco';

const url = '/api/clientes';

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

  listar(config: ConfigParams): Observable<Cliente[]> {
    const configParams = this.configService.configurarParametros(config);
    return this.http.get<Cliente[]>(url, {params: configParams});
  }

  visualizar(id: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(url + '?idCliente=' + id);
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(url + id,{});
  }

  efetivarAlteracaoSenha(usuario: Usuario): Observable<void>{
    return this.http.put<void>(url + '/alterar-senha/' + usuario.id, usuario)
  }

  efetivarAlteracaoCadastro(cliente: Cliente): Observable<void>{
    return this.http.put<void>(url + '/' + cliente.id + '/alterar-identificacao', cliente)
  }

  efetivarInclusaoTelefone(idCliente: number, telefone: Telefone): Observable<void>{
    return this.http.post<void>(url+ '/cliente/'+ idCliente +'/incluir-telefone', telefone)
  }

  efetivarAlteracaoEnderecoCobranca(idCliente: number, endereco: Endereco): Observable<void>{
    return this.http.put<void>(url+ '/' + idCliente + '/alterar-endereco', endereco)
  }

  efetivarInclusaoEnderecoCobranca(idCliente: number, endereco: Endereco): Observable<void>{
    return this.http.post<void>(url+ '/cliente/'+ idCliente + '/incluir-endereco', endereco)
  }

  efetivarAlteracaoEnderecoEntrega(idCliente: number, endereco: Endereco): Observable<void>{
    return this.http.put<void>(url+ '/' + idCliente + '/alterar-endereco', endereco)
  }

  efetivarInclusaoEnderecoEntrega(idCliente: number, endereco: Endereco): Observable<void>{
    return this.http.post<void>(url+ '/cliente/'+ idCliente + '/incluir-endereco/', endereco)
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