import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Cliente } from '../models/cliente';


@Component({
  selector: 'app-cadastro',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  cliente: Cliente = new Cliente();

  mensagem: string = '';


  cadastrar(form: any) {

    if (form.valid) {

      const clientesSalvos =
        localStorage.getItem(
          'clientes'
        );


      let clientes: Cliente[] = [];


      if (clientesSalvos) {

        const dados =
          JSON.parse(
            clientesSalvos
          );


        if (
          Array.isArray(dados)
        ) {

          clientes = dados;

        }

      }


      const novoCliente =
        {
          ...this.cliente
        };


      clientes.push(
        novoCliente
      );


      localStorage.setItem(
        'clientes',
        JSON.stringify(
          clientes
        )
      );


      this.mensagem =
        'Cadastro realizado com sucesso!';


      this.cliente =
        new Cliente();


      form.resetForm();

    } else {

      this.mensagem =
        'Verifique os campos do formulário.';

    }

  }


  formatarTelefone() {

    let numeros =
      this.cliente.telefone
        .replace(/\D/g, '');


    if (
      numeros.length > 11
    ) {

      numeros =
        numeros.substring(
          0,
          11
        );

    }


    if (
      numeros.length <= 3
    ) {

      this.cliente.telefone =
        '(' + numeros;

    } else if (
      numeros.length <= 7
    ) {

      this.cliente.telefone =
        '('
        + numeros.substring(
          0,
          3
        )
        + ') '
        + numeros.substring(
          3
        );

    } else {

      this.cliente.telefone =
        '('
        + numeros.substring(
          0,
          3
        )
        + ') '
        + numeros.substring(
          3,
          7
        )
        + '-'
        + numeros.substring(
          7
        );

    }

  }


  formatarCpf() {

    let numeros =
      this.cliente.cpf
        .replace(/\D/g, '');


    if (
      numeros.length > 11
    ) {

      numeros =
        numeros.substring(
          0,
          11
        );

    }


    if (
      numeros.length <= 3
    ) {

      this.cliente.cpf =
        numeros;

    } else if (
      numeros.length <= 6
    ) {

      this.cliente.cpf =
        numeros.substring(
          0,
          3
        )
        + '.'
        + numeros.substring(
          3
        );

    } else if (
      numeros.length <= 9
    ) {

      this.cliente.cpf =
        numeros.substring(
          0,
          3
        )
        + '.'
        + numeros.substring(
          3,
          6
        )
        + '.'
        + numeros.substring(
          6
        );

    } else {

      this.cliente.cpf =
        numeros.substring(
          0,
          3
        )
        + '.'
        + numeros.substring(
          3,
          6
        )
        + '.'
        + numeros.substring(
          6,
          9
        )
        + '-'
        + numeros.substring(
          9
        );

    }

  }


  formatarCep() {

    let numeros =
      this.cliente.cep
        .replace(/\D/g, '');


    if (
      numeros.length > 8
    ) {

      numeros =
        numeros.substring(
          0,
          8
        );

    }


    if (
      numeros.length <= 5
    ) {

      this.cliente.cep =
        numeros;

    } else {

      this.cliente.cep =
        numeros.substring(
          0,
          5
        )
        + '-'
        + numeros.substring(
          5
        );

    }

  }

}