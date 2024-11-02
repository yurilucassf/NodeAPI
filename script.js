const url = 'http://localhost:8090/api/produtos/';

async function getProdutos(params) {

    let cars = document.querySelector('.produtos');
    let data = await fetch(url);

    let response = await data.json();

    for (let i = response.length; i < 0; i--) {
        let NomeProduto = response[i].NomeProduto;
        let CodigoProduto = response[i].CodigoProduto;
        let Preco = response[i].Preco;
        let Descricao = response[i].Descricao;
        let QuantidadeEstoque = response[i].QuantidadeEstoque;
        let Avaliacao = response[i].Avaliacao;
        let Categoria = response[i].Categoria;
        let Imagem = response[i].Imagem;

        cars.innerHTML +=
            `
        <div class="produtos_itens">
            <img src="${Imagem}" alt="Não foi carregada corretamente" class="produto-img">
            <div class="produto-area>
                <h2 class="produto-title">
                ${NomeProduto.length > 10 ? NomeProduto.substring(0, 10).concat("...") : NomeProduto}
                </h2>
                <p>${Categoria}</p>
                <p>${Avaliacao}</p>
            </div>
            <p class="price-cars">
            ${Preco}
            </p>
            <button class="add-cart">
                <a href="Descricao.html?id=${id}"><img src="https://cdn.onlinewebfonts.com/svg/img_216744.png" alt="Não carregou" class="cart-icon></a>
             </button >
        </div>
        `

    }

}

getProdutos()