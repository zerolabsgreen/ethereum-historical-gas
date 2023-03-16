var express = require("express");
var app = express();

var fetcher = require("../src/fetcher");

app.get("/etherscanContractConsumption", async (req, res) => {
    var contractAddress = req.query.contractAddress;
    var gasConsumption = fetcher.getEtherscanData(contractAddress);
    res.json(gasConsumption);
});

app.listen(3000);