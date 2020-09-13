import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/core/clientes.service';
import { Cliente } from 'src/app/shared/models/cliente';

@Component({
  selector: 'tco-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})
export class DadosComponent implements OnInit {

  id: number;
  cliente: Cliente;
  isAlterarSenha: boolean;
  isAlterarCadastro: boolean;
  isAlterarEndereco: boolean;

  generos: string[] = ['FEMININO', 'MASCULINO', 'OUTROS'];
  telefones: string[] = ['RESIDENCIAL',	'CELULAR', 'COMERCIAL',	'OUTROS'];
  estados: string[] = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
	                     'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  firstFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private clienteService: ClientesService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.id=1;
    this.visualizar();
    this.isAlterarSenha=false;
    this.isAlterarCadastro=false;
    this.isAlterarEndereco=false;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/(\s)/g)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      ddd:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      telefone:  ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      dtNasc:  ['', [Validators.required]],
      genero: ['', [Validators.required]],
      tipoTelefone: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/(\s)/g)]],
      tipoLogradouro: ['', [Validators.required, Validators.minLength(3)]],
      logradouro: ['', [Validators.required, Validators.minLength(3)]],
      numero: ['', [Validators.required]],
      tipoResidencia: ['', [Validators.required, Validators.minLength(3)]],
      observacoes: ['', []],
      bairro: ['', [Validators.required, Validators.minLength(3)]],
      cidade: ['', [Validators.required, Validators.minLength(3)]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
    });
  }

  editar(): void {
    this.router.navigateByUrl('/cliente/cadastro/' + this.id);
  }

  private visualizar(): void {
    this.clienteService.visualizar(this.id).subscribe((cliente: Cliente) => this.cliente = cliente);
  }

  alterarSenha(): void {
    this.isAlterarSenha=true;
  }

  alterarCadastro(): void {
    this.isAlterarCadastro=true;
  }

  alterarEnderecoCobranca(): void {
    this.isAlterarEndereco=true;
  }

}