import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'tco-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {

  estados: string[] = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
                       'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
                       
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      tipoEndereco: ['', [Validators.required]],
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
