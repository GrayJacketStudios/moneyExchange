var express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require("cheerio");
var port = process.env.PORT || 3000;

app.get('/:monedaOrigen/:valorInicial/:monedaDestino', function (req, res) {
    getConvertion(req.params.valorInicial,req.params.monedaOrigen,req.params.monedaDestino)
    .then(respuesta => {
        res.send(respuesta);
    })
    .catch((err)=>{
        res.send("Error de proceso, revisar datos.<br>"+err);
    });
});

async function getConvertion(valorInicial, monedaOrigen, monedaDestino){
    let val = await axios.get('https://www.google.com/search?q='+valorInicial+'+'+monedaOrigen+'+to+'+monedaDestino+'&oq='+valorInicial+'+'+monedaOrigen+'+to+'+monedaDestino)
    
    var $ = cheerio.load(val.data);
    var res = $('div').next().children().children().children().children().children().children().children().children().children().text();
    var token = res.split(" ");
    return token[0];
}

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});