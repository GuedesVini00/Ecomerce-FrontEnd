
export interface ProdutoHistorico {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}

export interface ItemPedidoHistorico {
  id: number;
  produto: ProdutoHistorico;
  quantidade: number;
  precoUnitario: number;
}

export interface PedidoHistorico {
  id: number;
  dataPedido: string;
  status: string;
  valorTotal: number;
  itens: ItemPedidoHistorico[];
}
