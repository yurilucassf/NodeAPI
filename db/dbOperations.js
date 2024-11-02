var config = require("./dbconfig");
const sql = require("mssql");

async function getProdutos() {
  try {
    let pool = await sql.connect(config);
    let lojas = await pool.request().query("SELECT * FROM [dbo].[Produtos]");
    return lojas.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getProduto(codigoProduto) {
  try {
    let pool = await sql.connect(config);
    let products = await pool
      .request()
      .input("input_codigo", sql.NVarChar, codigoProduto) 
      .query("SELECT * FROM [dbo].[Produtos] WHERE CodigoProduto = @input_codigo"); 
    return products.recordset; 
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error; 
  }
}


async function addProduto(produto) {
  try {
    let pool = await sql.connect(config);
    let lojas = await pool.request()
      .query(
        `INSERT INTO [dbo].[Produtos] 
           (
      [NomeProduto], 
      [CodigoProduto], 
      [Preco], 
      [Descricao], 
      [QuantidadeEstoque], 
      [Avaliacao], 
      [Categoria] 
     ) 
           VALUES (
             '${produto.NomeProduto}', 
             '${produto.CodigoProduto}', 
             ${produto.Preco}, 
             '${produto.Descricao}', 
             ${produto.QuantidadeEstoque}, 
             ${produto.Avaliacao}, 
             '${produto.Categoria}'
           )`
      );
    return lojas.recordset;
  } catch (error) {
    console.error(error);
  }
}
async function updateProduto(produto) {
  try {
    let pool = await sql.connect(config);
    let loja = await pool
      .request()
      .input("Id", sql.Int, produto.Id)
      .query(`
        UPDATE [dbo].[Produtos] SET 
          NomeProduto = '${produto.NomeProduto}', 
          CodigoProduto = '${produto.CodigoProduto}', 
          Preco = ${produto.Preco}, 
          Descricao = '${produto.Descricao}', 
          QuantidadeEstoque = ${produto.QuantidadeEstoque}, 
          Avaliacao = ${produto.Avaliacao}, 
          Categoria = '${produto.Categoria}'
        WHERE Id = @Id
      `);
    return loja.recordset;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
  }
}


async function deleteProduto(produtoId) {
  try {
    let pool = await sql.connect(config);
    let deleteProduct = await pool
      .request()
      .input("input_parameter", sql.Int, produtoId)
      .query(`DELETE FROM [dbo].[Produtos] WHERE Id = @input_parameter`);
    return deleteProduct.recordsets;
  } catch (error) {
    console.error(error);
  }
}

async function getProdutosPorCategoria(categoria) {
  console.log(`Buscando produtos para a categoria: ${categoria}`); 
  try {
    let pool = await sql.connect(config);
    let produtos = await pool
      .request()
      .input("input_categoria", sql.NVarChar, categoria)
      .query("SELECT * FROM [dbo].[Produtos] WHERE Categoria = @input_categoria");
    
    return produtos.recordset;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}



module.exports = {
  getProdutos,
  getProduto,
  addProduto,
  updateProduto,
  deleteProduto,
  getProdutosPorCategoria
};
