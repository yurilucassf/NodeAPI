var Db = require("./db/dbOperations");
var dbOperations = require("./db/dbOperations");
var Produto = require('./Produtos/produto')

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

router.route("/produtos").get((request, response) => {
  dbOperations.getProdutos().then((result) => {
    response.json(result[0]);
  });
});

router.route("/produtos/codigo/:codigo").get((request, response) => {
  let codigo = request.params.codigo;
  dbOperations.getProduto(codigo)
    .then((result) => {
      response.json(result);
    })
});


router.route("/produtos").post((request, response) => {
  let produto = { ...request.body };
  dbOperations.addProduto(produto).then((result) => {
    console.log(result);
    response.status(201).json(result);
  });
});

router.route("/produtos").patch((request, response) => {
  let produtos = { ...request.body };
  dbOperations.updateProduto(produtos).then((result) => {
    response.status(204).json(result);
  });
});

router.route("/produtos/:id").delete((request, response) => {
  let id = parseInt(request.params.id);
  dbOperations.deleteProduto(id).then((result) => {
    response.json(result);
  });
});

router.route("/produtos/categoria/:categoria").get((request, response) => {
  let categoria = request.params.categoria;
  dbOperations.getProdutosPorCategoria(categoria)
    .then((result) => {
      response.json(result); 
    })
});


var port = process.env.PORT || 8090;
app.listen(port);
console.log("Api de produtos rodando na rota: " + port);
