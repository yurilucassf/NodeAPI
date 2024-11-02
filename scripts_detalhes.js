const urlParams = new URLSearchParams(window.location.search)
const getId = urlParams.get('id')
const url = 'http://localhost:8090/api/produtos/' + getId;

function atualizarCampos(){
    var produtoAtualizado = {
        id: getId,
        NomeProduto:"Bola de Futebol",
        Descricao: "Bola para jogar futebol",
        Avaliacao: '5',
        Categoria:'Futebol',
        Imagem: 'https://th.bing.com/th?id=OPHS.lY7CLglw0M90qw474C474&w=146&h=146&c=8&pcl=1b1a19&o=2&dpr=2&pid=21.1'
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 204){
            alert("Produto foi atualizado com sucesso!")
            }
            else{
                alert("Erro ao atualizar o produto.  " + this.status)
            }
        }
    }

    xhttp.open("PATCH", "http://localhost:8090/api/Produtos/");
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify(produtoAtualizado));
}

async function getOneProdutos(params) {

    let cars = document.querySelector('.produtos');
    let data = await fetch(url);

    let response = await data.json();

        let i = 0;
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
        <div class="produtos_itens px:4 justify-content: center>
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
             <button  class="add-cart" onclick = "atualizarCampos()>
                <img src="https://th.bing.com/th/id/OIP.d1sTN41laBxAg-Uy_pXvmgHaHx?pid=ImgDet&rs=1" alt="" class="cart-icon">
              </button>
        </div>
        `
    

}

getProdutos()