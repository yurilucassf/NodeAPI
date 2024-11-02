class Produto {
  constructor(NomeProduto, CodigoProduto, Preco, Descricao, QuantidadeEstoque, Avaliacao, Categoria) {
    this.NomeProduto = NomeProduto;
    this.CodigoProduto = CodigoProduto;
    this.Preco = Preco;
    this.Descricao = Descricao;
    this.QuantidadeEstoque = QuantidadeEstoque;
    this.Avaliacao = Avaliacao;
    this.Categoria = Categoria;
  }
}

module.exports = Produto;
