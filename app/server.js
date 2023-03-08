var express = require("express");
var app = express();

var fetcher = require("../src/fetcher");

app.get("/etherscanContractConsumption", function(req, res) {
    var contractAddress = req.query.contractAddress;
    var gasConsumption = fetcher.getEtherscanData(contractAddress);
    res.send(gasConsumption); // JSON.stringify() or something like that?
});

app.listen(3000);