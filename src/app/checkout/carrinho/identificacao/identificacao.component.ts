import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'tco-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.scss']
})
export class IdentificacaoComponent implements OnInit {

  generos: string[] = ['FEMININO', 'MASCULINO', 'OUTROS'];
  telefones: string[] = ['RESIDENCIAL',	'CELULAR', 'COMERCIAL',	'OUTROS'];
  estados: string[] = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
	                     'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
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

}
