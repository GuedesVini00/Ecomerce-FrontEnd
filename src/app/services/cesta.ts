import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ItemCesta } from '../models/item-cesta';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  itens: ItemCesta[] = [];

  desconto: number = 0;

  frete: number = 0;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {

    if (isPlatformBrowser(this.platformId)) {
      this.carregarCesta();
    }

  }

  carregarCesta() {

    const cestaSalva =
      localStorage.getItem('matrix_cesta');

    if (cestaSalva != null) {

      this.itens =
        JSON.parse(cestaSalva);

    }

  }

  salvarCesta() {

    if (isPlatformBrowser(this.platformId)) {

      localStorage.setItem(
        'matrix_cesta',
        JSON.stringify(this.itens)
      );

    }

  }

  adicionarProduto(produto: Produto) {

    const itemExistente = this.itens.find(
      item => item.produto.id === produto.id
    );

    if (itemExistente) {

      itemExistente.quantidade++;

    } else {

      const novoItem = new ItemCesta();

      novoItem.produto = produto;
      novoItem.quantidade = 1;

      this.itens.push(novoItem);

    }

    this.salvarCesta();

  }

  getItens() {

    return this.itens;

  }

  aumentarQuantidade(item: ItemCesta) {

    item.quantidade++;

    this.salvarCesta();

  }

  diminuirQuantidade(item: ItemCesta) {

    if (item.quantidade > 1) {

      item.quantidade--;

    }

    this.salvarCesta();

  }

  removerItem(item: ItemCesta) {

    const posicao = this.itens.indexOf(item);

    if (posicao >= 0) {

      this.itens.splice(posicao, 1);

    }

    this.salvarCesta();

  }

  calcularTotalProdutos() {

    let total = 0;

    for (let item of this.itens) {

      total +=
        item.produto.preco *
        item.quantidade;

    }

    return total;

  }

  salvarDesconto(valor: number) {

    this.desconto = valor;

  }

  getDesconto() {

    return this.desconto;

  }

  salvarFrete(valor: number) {

    this.frete = valor;

  }

  getFrete() {

    return this.frete;

  }

  calcularTotalFinal() {

    return this.calcularTotalProdutos()
      - this.desconto
      + this.frete;

  }

  limparCesta() {

    this.itens.splice(
      0,
      this.itens.length
    );

    this.desconto = 0;

    this.frete = 0;

    this.salvarCesta();

  }

}