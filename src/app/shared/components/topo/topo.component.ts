import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from "rxjs/operators"
import { ProdutosService } from 'src/app/core/produtos.service';
import { Produto } from '../../models/produto';
import { ConfigParams } from '../../models/config-prams';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'tco-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  options: string[] = ['Vaso de orquídea', 'Arranjo de rosas', 'Cesta de flores e bombons'];
  filteredOptions: Observable<string[]>;
  quantidadeItensCarrinho = 2;
  
  filtrosListagem: FormGroup;

  config: ConfigParams = {
    pagina: 0,
    limite: 4
  };

  constructor(private router: Router, private fb: FormBuilder, private produtosService: ProdutosService, public dialog: MatDialog) { }

  ngOnInit() {
    
    this.filtrosListagem = this.fb.group({
      texto: [''],
      categoria: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('categoria').valueChanges.subscribe((val: string) => {
      if(val && val.length > 0) {
        if(val.length > 1) {
          val = val[1];
        }
        this.config.campo = {tipo: 'categoria', valor: val};
      } else {
        this.config.campo = undefined
      }
      this.resetarConsulta();
    });
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.produtosService.limparProdutos();
    this.listarProdutos();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  openSideNav() {
    this.sidenav.open();
  }

  closeSideNav() {
    this.sidenav.close();
  }

  goHome() {
    this.router.navigateByUrl("/");
  }

  private listarProdutos(): void {
    this.config.pagina++;
    this.produtosService.listar(this.config)
      .subscribe((produtos: Produto[]) => this.produtosService.addProdutos(produtos));
  }
  toggleChange(event) {
    let toggle = event.source;
    if (toggle) {
      let group = toggle.buttonToggleGroup;
      if (event.value.some(item => item == toggle.value)) {
        group.value = [toggle.value];
      }
    }
  }
  abrirCarrinho() {
    this.router.navigateByUrl("/carrinho")
  }
  abrirLogin() {
    this.dialog.open(DialogElements)
  }
} 

@Component({
  selector: 'tco-dialog-elements-login',
  templateUrl: 'dialog.login.html',
})
export class DialogElements implements OnInit {

  fifthFormGroup: FormGroup;
  constructor(private router:Router,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  abrirCliente(){
    this.router.navigateByUrl("/cliente")
  }
  abrirCadastro(){
    this.router.navigateByUrl("/cliente/cadastro")
  }
}