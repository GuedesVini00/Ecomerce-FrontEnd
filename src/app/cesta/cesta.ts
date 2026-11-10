
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CestaService } from '../services/cesta';
import { ItemCesta } from '../models/item-cesta';

@Component({
  selector: 'app-cesta',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css'
})
export class Cesta {

  itens: ItemCesta[] = [];

  // Signal que acompanha as alterações do carrinho
  readonly versaoCarrinho;

  cupom: string = '';
  desconto: number = 0;
  mensagemCupom: string = '';

  cep: string = '';
  frete: number = 0;
  mensagemFrete: string = '';

  constructor(
    private cestaService: CestaService,
    private router: Router
  ) {

    // Mantém a referência dos produtos do serviço
    this.itens = this.cestaService.getItens();

    // Conecta o componente ao Signal do serviço
    this.versaoCarrinho =
      this.cestaService.versaoCarrinho;
  }

  // AUMENTAR QUANTIDADE
  aumentar(item: ItemCesta): void {

    this.cestaService.aumentarQuantidade(item);

  }

  // DIMINUIR QUANTIDADE
  diminuir(item: ItemCesta): void {

    this.cestaService.diminuirQuantidade(item);

  }

  // REMOVER PRODUTO
  remover(item: ItemCesta): void {

    this.cestaService.removerItem(item);

  }

  // CALCULAR TOTAL DOS PRODUTOS
  calcularTotal(): number {

    return this.cestaService.calcularTotalProdutos();

  }

  // APLICAR CUPOM
  aplicarCupom(): void {

    if (this.cupom.toUpperCase() === 'DESCONTO10') {

      this.desconto = this.calcularTotal() * 0.10;

      this.cestaService.salvarDesconto(this.desconto);

      this.mensagemCupom =
        'Cupom aplicado com sucesso!';

    } else {

      this.desconto = 0;

      this.cestaService.salvarDesconto(0);

      this.mensagemCupom = 'Cupom inválido.';

    }
  }

  // FORMATAR CEP
  formatarCep(): void {

    let numeros = this.cep.replace(/\D/g, '');

    if (numeros.length > 8) {
      numeros = numeros.substring(0, 8);
    }

    if (numeros.length <= 5) {

      this.cep = numeros;

    } else {

      this.cep =
        numeros.substring(0, 5)
        + '-'
        + numeros.substring(5);

    }
  }

  // CALCULAR FRETE
  calcularFrete(): void {

    const cepNumeros = this.cep.replace(/\D/g, '');

    if (cepNumeros.length === 8) {

      this.frete = 19.90;

      this.cestaService.salvarFrete(this.frete);

      this.mensagemFrete =
        'Frete calculado com sucesso!';

    } else {

      this.frete = 0;

      this.cestaService.salvarFrete(0);

      this.mensagemFrete =
        'Digite um CEP válido.';

    }
  }

  // CALCULAR TOTAL FINAL
  calcularTotalFinal(): number {

    return (
      this.calcularTotal()
      - this.desconto
      + this.frete
    );

  }

  // FINALIZAR COMPRA
  finalizarCompra(): void {

    this.cestaService.salvarDesconto(this.desconto);

    this.cestaService.salvarFrete(this.frete);

    this.router.navigate(['/pedido']);

  }

  irParaMeusPedidos(): void {
  this.router.navigate(['/meus-pedidos']);
}
}
