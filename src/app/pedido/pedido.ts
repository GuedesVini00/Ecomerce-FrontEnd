import { Router } from '@angular/router';

import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Pedido as PedidoModel } from '../models/pedido';
import { CestaService } from '../services/cesta';

import { PedidoApiService, CriarPedido } from '../services/pedido-api';
import { SessaoService } from '../services/sessao';



@Component({
  selector: 'app-pedido',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class Pedido {

  pedido: PedidoModel =
    new PedidoModel();

  mensagem: string = '';

  numeroCartao: string = '';

  nomeCartao: string = '';

  validadeCartao: string = '';

  cvv: string = '';

  compraFinalizada: boolean = false;
  numeroPedido: number | null = null;


  constructor(
    private cestaService: CestaService,
    private pedidoApi: PedidoApiService,
    private sessaoService: SessaoService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {

    this.pedido.valorProdutos =
      this.cestaService
        .calcularTotalProdutos();

    this.pedido.desconto =
      this.cestaService
        .getDesconto();

    this.pedido.frete =
      this.cestaService
        .getFrete();

    this.pedido.valorTotal =
      this.cestaService
        .calcularTotalFinal();

  }


  formatarCep() {

    let numeros =
      this.pedido.cep
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

      this.pedido.cep =
        numeros;

    } else {

      this.pedido.cep =
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


  formatarCartao() {

    let numeros =
      this.numeroCartao
        .replace(/\D/g, '');


    if (
      numeros.length > 16
    ) {

      numeros =
        numeros.substring(
          0,
          16
        );

    }


    this.numeroCartao =
      numeros.replace(
        /(\d{4})(?=\d)/g,
        '$1 '
      );

  }


  formatarValidade() {

    let numeros =
      this.validadeCartao
        .replace(/\D/g, '');


    if (
      numeros.length > 4
    ) {

      numeros =
        numeros.substring(
          0,
          4
        );

    }


    if (
      numeros.length <= 2
    ) {

      this.validadeCartao =
        numeros;

    } else {

      this.validadeCartao =
        numeros.substring(
          0,
          2
        )
        + '/'
        + numeros.substring(
          2
        );

    }

  }


  
finalizarCompra(form: any) {

  if (!form.valid) {
    this.mensagem = 'Preencha todos os campos corretamente.';
    return;
  }

  const clienteId = this.sessaoService.getClienteId();

  if (clienteId === null) {
    this.mensagem = 'Faça login antes de finalizar a compra.';
    return;
  }

  const itens = this.cestaService.getItens();

  if (itens.length === 0) {
    this.mensagem = 'Seu carrinho está vazio.';
    return;
  }

  const dadosPedido: CriarPedido = {
    clienteId: clienteId,

    itens: itens.map(item => ({
      produtoId: item.produto.id,
      quantidade: item.quantidade
    }))
  };

  this.pedidoApi.criarPedido(dadosPedido).subscribe({

  
  next: (pedidoCriado) => {

  console.log('Cliente ANTES de limpar a cesta:',
    this.sessaoService.getClienteId());

  this.numeroPedido = pedidoCriado.id;
  this.compraFinalizada = true;
  this.mensagem = '';

  this.cestaService.limparCesta();
  this.cd.markForCheck();

  console.log('Cliente DEPOIS de limpar a cesta:',
    this.sessaoService.getClienteId());

  
  },

  error: (erro) => {

    console.error('Erro ao finalizar compra:', erro);

    this.mensagem =
      erro.error?.mensagem ||
      'Não foi possível realizar a compra. Tente novamente.';

    this.cd.markForCheck();
  }


  });

}

  voltarInicio() {
  this.router.navigate(['/']);
  }

}