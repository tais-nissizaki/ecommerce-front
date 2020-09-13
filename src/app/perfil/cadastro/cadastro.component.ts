import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClientesService } from 'src/app/core/clientes.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  cliente: Cliente;
  generos: string[] = ['FEMININO', 'MASCULINO', 'OUTROS'];
  telefones: string[] = ['RESIDENCIAL',	'CELULAR', 'COMERCIAL',	'OUTROS'];
  estados: string[] = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
	                     'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  constructor(private _formBuilder: FormBuilder,
              private clienteService: ClientesService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.criarFormulario(this.criarClienteEmBranco());
  }

  submit(): void {
    alert("entrei no submit");
    this.cadastro.markAllAsTouched();
    console.log(this.cadastro);
    if (this.cadastro.invalid) {
      return;
    }

    const cliente = this.cadastro.getRawValue();
    console.log(cliente);
    if (this.id) {
      alert("tenho id");
      // cliente.id = this.id;
      // this.editar(cliente);
    } else {
      alert("sem id");
      const clienteCadastro: Cliente = {
        ativo: true,
        cpf: cliente.cpf,
        dtNasc: cliente.dtNasc,
        genero: cliente.genero,
        usuario: {
          ativo: true,
          confirmaSenha: cliente.confirmaSenha,
          login: cliente.email,
          senha: cliente.senha
        },
        nome: {
          nome: cliente.nome
        },
        telefone: [
          {
            ddd: cliente.ddd,
            numero: cliente.numero,
            tipoTelefone: cliente.tipoTelefone
          }
        ],
        endereco: [
          {
            bairro: cliente.bairro,
            cep: cliente.cep,
            cidade: {
              cidade: cliente.cidade,
              estado: cliente.estado
            },
            descricao: cliente.descricao,
            logradouro: cliente.logradouro,
            numero: cliente.numero,
            observacoes: cliente.observacoes,
            tipoEndereco: "COBRANCA",
            tipoLogradouro: cliente.tipoLogradouro,
            tipoResidencia: cliente.tipoResidencia
          },
          {
            bairro: cliente.bairro,
            cep: cliente.cep,
            cidade: {
              cidade: cliente.cidade,
              estado: cliente.estado
            },
            descricao: cliente.descricao,
            logradouro: cliente.logradouro,
            numero: cliente.numero,
            observacoes: cliente.observacoes,
            tipoEndereco: "ENTREGA",
            tipoLogradouro: cliente.tipoLogradouro,
            tipoResidencia: cliente.tipoResidencia
          }
        ],     
      }
      this.salvar(clienteCadastro);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(cliente: Cliente): void {
    this.cadastro = this._formBuilder.group({
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
      ],     
    } as Cliente;
  }

  private salvar(cliente: Cliente): void {
    this.clienteService.salvar(cliente).subscribe(() => {
      const config = {
        data: {
          //btnSucesso: 'Ir para a listagem',
          //btnCancelar: 'Cadastrar um novo cliente',
          //corBtnCancelar: 'primary',
          descricao: 'Cadastro efetuado com Sucesso!',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('clientes');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }


}
