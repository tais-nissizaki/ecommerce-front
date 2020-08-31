import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'tco-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {
  fourthFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  quantidadeCartoesCredito = [1];
  quantidadeCartoesDebito = [1];

  ngOnInit() {
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
      meioPagamento:['']
    });
  }

  adicionarCartaoCredito() {
    this.quantidadeCartoesCredito.push(1);
  }

  adicionarCartaoDebito() {
    this.quantidadeCartoesDebito.push(1);
  }

}
