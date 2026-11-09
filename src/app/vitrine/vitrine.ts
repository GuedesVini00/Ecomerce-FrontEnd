import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Produto } from '../models/produto';
import { CestaService } from '../services/cesta';

import { OnInit } from '@angular/core';
import { ProdutoApiService } from '../services/produto-api';


@Component({
  selector: 'app-vitrine',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})
export class Vitrine implements OnInit{

  produtoSelecionado: Produto | null = null;

  categoriaSelecionada: string = 'Todos';

  pesquisa: string = '';

  mensagemCarrinho: string = '';

 produtos: Produto[] = [];

  constructor(
  private cestaService: CestaService,
  private cd: ChangeDetectorRef,
  private produtoApi: ProdutoApiService,
) {

}

 ngOnInit(): void {
    this.produtoApi.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.cd.markForCheck();
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }

  filtrarCategoria(categoria: string) {

    this.categoriaSelecionada = categoria;

  }


  get produtosFiltrados() {

    let lista = this.produtos;

    if (this.categoriaSelecionada !== 'Todos') {

      lista = lista.filter(
        produto =>
          produto.categoria === this.categoriaSelecionada
      );

    }

    if (this.pesquisa.trim() !== '') {

      lista = lista.filter(
        produto =>
          produto.nome
            .toLowerCase()
            .includes(
              this.pesquisa.toLowerCase()
            )
      );

    }

    return lista;

  }

  formatarPreco(valor: number) {

  return valor.toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL'
    }
  );

}
  comprar(produto: Produto) {

  this.cestaService.adicionarProduto(produto);

  this.mensagemCarrinho =
    produto.nome + ' adicionado ao carrinho!';


  setTimeout(() => {

    this.mensagemCarrinho = '';

    this.cd.markForCheck();

  }, 2500);

}


  abrirDetalhes(produto: Produto) {

    this.produtoSelecionado = produto;

  }


  fecharDetalhes() {

    this.produtoSelecionado = null;

  }

}