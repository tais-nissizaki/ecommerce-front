import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'tco-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  bandeiras: string[] = ['VISA', 'MASTER', 'ELO'];

  fourthFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  quantidadeCartoesCredito = [1];

  ngOnInit() {
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
      bandeira: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/(\s)/g)]],
      validade: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(5)]],
      valor: [''],
    });
  }

  adicionarCartaoCredito() {
    this.quantidadeCartoesCredito.push(1);
  }

}
