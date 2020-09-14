import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/core/clientes.service';
import { Cliente } from 'src/app/shared/models/cliente';
import { Usuario } from 'src/app/shared/models/usuario';
import { Telefone } from 'src/app/shared/models/telefone';
import { Endereco } from 'src/app/shared/models/endereco';

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
  isIncluirTelefone: boolean;
  isIncluirEnderecoCobranca: boolean;
  isAlterarEnderecoCobranca: boolean;
  isIncluirEnderecoEntrega: boolean;
  isAlterarEnderecoEntrega: boolean;

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
    // this.cliente = this.criarClienteEmBranco();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.id=2;
    this.visualizar();
    this.isAlterarSenha=false;
    this.isAlterarCadastro=false;
    this.isIncluirTelefone=false;
    this.isIncluirEnderecoCobranca= false;
    this.isAlterarEnderecoCobranca= false;
    this.isIncluirEnderecoEntrega= false;
    this.isAlterarEnderecoEntrega= false;
    // this.criarFormulario(this.criarClienteEmBranco());
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/(\s)/g)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(8)]],
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

  private criarClienteEmBranco(): Cliente {
    return {
      usuario: {
        ativo: true,
        confirmaSenha: null,
        login: null,
        senha: null
      },
      nome: {
        nome: null
      },
      genero: null, 
      ativo: true,
      cpf: null,
      dtNasc: null,
      telefone: [
        {
          ddd: null,
          numero: null,
          tipoTelefone: null
        }
      ],
      endereco: [
        {
          bairro: null,
          cep: null,
          cidade: {
            cidade: null,
            estado: null
          },
          descricao: null,
          logradouro: null,
          numero: null,
          observacoes: null,
          tipoEndereco: null,
          tipoLogradouro: null,
          tipoResidencia: null
        },
        {
          bairro: null,
          cep: null,
          cidade: {
            cidade: null,
            estado: null
          },
          descricao: null,
          logradouro: null,
          numero: null,
          observacoes: null,
          tipoEndereco: null,
          tipoLogradouro: null,
          tipoResidencia: null
        },
      ],     
    } as Cliente;
  }

  private criarFormulario(cliente: Cliente): void {
    this.firstFormGroup = this._formBuilder.group({
      nome: [cliente.nome.nome, [Validators.required, Validators.minLength(2), Validators.pattern(/(\s)/g)]],
      cpf: [cliente.cpf, [Validators.required, Validators.minLength(11)]],
      email: [cliente.usuario.login, [Validators.required, Validators.email]],
      senha: [cliente.usuario.senha, [Validators.required, Validators.minLength(8)]],
      confirmaSenha: [cliente.usuario.confirmaSenha, [Validators.required, Validators.minLength(8)]],
      ddd:  [cliente.telefone[0].ddd, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      telefone:  [cliente.telefone[0].numero, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      dtNasc:  [cliente.dtNasc, [Validators.required]],
      genero: [cliente.genero, [Validators.required]],
      tipoTelefone: [cliente.telefone[0].tipoTelefone, [Validators.required]],
      descricao: [cliente.endereco[0].descricao, [Validators.required, Validators.minLength(3), Validators.pattern(/(\s)/g)]],
      tipoLogradouro: [cliente.endereco[0].tipoLogradouro, [Validators.required, Validators.minLength(3)]],
      logradouro: [cliente.endereco[0].logradouro, [Validators.required, Validators.minLength(3)]],
      numero: [cliente.endereco[0].numero, [Validators.required]],
      tipoResidencia: [cliente.endereco[0].tipoResidencia, [Validators.required, Validators.minLength(3)]],
      observacoes: [cliente.endereco[0].observacoes, []],
      bairro: [cliente.endereco[0].bairro, [Validators.required, Validators.minLength(3)]],
      cidade: [cliente.endereco[0].cidade.cidade, [Validators.required, Validators.minLength(3)]],
      estado: [cliente.endereco[0].cidade.estado, [Validators.required]],
      cep: [cliente.endereco[0].cep, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
    });
  }

  editar(): void {
    this.router.navigateByUrl('/cliente/cadastro/' + this.id);
  }

  private visualizar(): void {
    this.clienteService.visualizar(this.id).subscribe((cliente: Cliente[]) =>{
      if(cliente) {
        
      this.cliente = cliente[0];
      }
      console.log(cliente);
    } );
  }

  alterarSenha(): void {
    this.isAlterarSenha=true;
  }

  efetuarAlteracaoSenha(): void {
    const usuario: Usuario ={
      id:this.cliente.usuario.id,
      ativo:this.cliente.usuario.ativo,
      login:this.cliente.usuario.login,
      senha:this.firstFormGroup.value.senha,
      confirmaSenha:this.firstFormGroup.value.confirmaSenha
    }
    this.clienteService.efetivarAlteracaoSenha(usuario)
    .subscribe(() => {
      alert("Alteração de senha efetuada com sucesso.")
    });

  }

  alterarCadastro(): void {
    if(!this.isAlterarCadastro){
      this.isAlterarCadastro=true;
    } else{
      this.isAlterarCadastro=false;
    } 
  }

  efetuarAlteracaoCadastro(): void {
    const cliente: Cliente ={
      id:this.cliente.id,
      ativo: this.cliente.ativo,
      cpf: this.cliente.cpf,
      telefone: [{
        id:this.cliente.telefone[0].id,
        tipoTelefone:this.firstFormGroup.value.tipoTelefone,
        ddd:this.firstFormGroup.value.ddd,
        numero:this.firstFormGroup.value.telefone,
      }],
      usuario: this.cliente.usuario,
      nome: {
        nome: this.firstFormGroup.value.nome,
      },
      genero:this.firstFormGroup.value.genero,
      dtNasc:this.firstFormGroup.value.dtNasc, 
      endereco: this.cliente.endereco    
    }
    this.clienteService.efetivarAlteracaoCadastro(cliente)
    .subscribe(() => {
      alert("Alteração de cadastro efetuada com sucesso.")
    });
  }

  alterarEnderecoCobranca(): void {
    if(!this.isAlterarEnderecoCobranca){
      this.isAlterarEnderecoCobranca=true;
    } else{
      this.isAlterarEnderecoCobranca=false;
    } 
  }

  efetuarAlteracaoEnderecoCobranca(): void {
    const endereco: Endereco ={
      id: this.cliente.endereco[0].id,
      tipoEndereco: "COBRANCA",
      descricao: this.firstFormGroup.value.descricao,
      tipoLogradouro: this.firstFormGroup.value.tipoLogradouro,
      logradouro: this.firstFormGroup.value.logradouro,
      numero: this.firstFormGroup.value.numero,
      tipoResidencia: this.firstFormGroup.value.tipoResidencia,
      observacoes: this.firstFormGroup.value.observacoes,
      bairro: this.firstFormGroup.value.bairro,
      cidade: {
        cidade: this.firstFormGroup.value.cidade,
        estado: this.firstFormGroup.value.estado
      },
      cep: this.firstFormGroup.value.cep
    }
    this.clienteService.efetivarAlteracaoEnderecoCobranca(this.cliente.id, endereco)
    .subscribe(() => {
      alert("Alteração de endereço efetuada com sucesso.")
    });
  }

  alterarEnderecoEntrega(): void {
    if(!this.isAlterarEnderecoEntrega){
      this.isAlterarEnderecoEntrega=true;
    } else{
      this.isAlterarEnderecoEntrega=false;
    } 
  }

  efetuarAlteracaoEnderecoEntrega(): void {
    const endereco: Endereco ={
      id: this.cliente.endereco[1].id,
      tipoEndereco: "ENTREGA",
      descricao: this.firstFormGroup.value.descricao,
      tipoLogradouro: this.firstFormGroup.value.tipoLogradouro,
      logradouro: this.firstFormGroup.value.logradouro,
      numero: this.firstFormGroup.value.numero,
      tipoResidencia: this.firstFormGroup.value.tipoResidencia,
      observacoes: this.firstFormGroup.value.observacoes,
      bairro: this.firstFormGroup.value.bairro,
      cidade: {
        cidade: this.firstFormGroup.value.cidade,
        estado: this.firstFormGroup.value.estado
      },
      cep: this.firstFormGroup.value.cep
    }
    this.clienteService.efetivarAlteracaoEnderecoEntrega(this.cliente.id,endereco)
    .subscribe(() => {
      alert("Alteração de endereço efetuada com sucesso.")
    });
  }

  incluirTelefone(): void {
    if(!this.isIncluirTelefone){
      this.isIncluirTelefone=true;
    } else{
      this.isIncluirTelefone=false;
    } 
  }
  
  efetuarInclusaoTelefone(): void {
    const telefone: Telefone ={
      tipoTelefone:this.firstFormGroup.value.tipoTelefone,
      ddd:this.firstFormGroup.value.ddd,
      numero:this.firstFormGroup.value.telefone,
    }
    this.clienteService.efetivarInclusaoTelefone(this.cliente.id, telefone)
    .subscribe(() => {
      alert("Alteração de telefone efetuada com sucesso.")
    });
  }

  incluirEnderecoCobranca(): void {
    if(!this.isIncluirEnderecoCobranca){
      this.isIncluirEnderecoCobranca=true;
    } else{
      this.isIncluirEnderecoCobranca=false;
    }
  }

  efetuarInclusaoEnderecoCobranca(): void {
    const endereco: Endereco ={
      tipoEndereco: "ENTREGA",
      descricao: this.firstFormGroup.value.descricao,
      tipoLogradouro: this.firstFormGroup.value.tipoLogradouro,
      logradouro: this.firstFormGroup.value.logradouro,
      numero: this.firstFormGroup.value.numero,
      tipoResidencia: this.firstFormGroup.value.tipoResidencia,
      observacoes: this.firstFormGroup.value.observacoes,
      bairro: this.firstFormGroup.value.bairro,
      cidade: {
        cidade: this.firstFormGroup.value.cidade,
        estado: this.firstFormGroup.value.estado
      },
      cep: this.firstFormGroup.value.cep
    }
    this.clienteService.efetivarInclusaoEnderecoCobranca(this.cliente.id, endereco)
    .subscribe(() => {
      alert("Inclusão de endereço efetuada com sucesso.")
    });
  }

  incluirEnderecoEntrega(): void {
    if(!this.isIncluirEnderecoEntrega){
      this.isIncluirEnderecoEntrega=true;
    } else{
      this.isIncluirEnderecoEntrega=false;
    }
  }

  efetuarInclusaoEnderecoEntrega(): void {
    const endereco: Endereco ={
      tipoEndereco: "ENTREGA",
      descricao: this.firstFormGroup.value.descricao,
      tipoLogradouro: this.firstFormGroup.value.tipoLogradouro,
      logradouro: this.firstFormGroup.value.logradouro,
      numero: this.firstFormGroup.value.numero,
      tipoResidencia: this.firstFormGroup.value.tipoResidencia,
      observacoes: this.firstFormGroup.value.observacoes,
      bairro: this.firstFormGroup.value.bairro,
      cidade: {
        cidade: this.firstFormGroup.value.cidade,
        estado: this.firstFormGroup.value.estado
      },
      cep: this.firstFormGroup.value.cep
    }
    this.clienteService.efetivarInclusaoEnderecoEntrega(this.cliente.id, endereco)
    .subscribe(() => {
      alert("Inclusão de endereço efetuada com sucesso.")
    });
  }
}