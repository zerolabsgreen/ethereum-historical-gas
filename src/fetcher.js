var dotenv = require("dotenv");

dotenv.config()

var url = "https://api.etherscan.io/api"


function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }

 function process_etherscan_response(resp, queryType) {
    console.log("process_etherscan_response(), queryType: " + queryType);
    console.log("resp:" + resp);
 }
 

exports.getEtherscanData = (contractAddress) => {
    etherscan_api_key = process.env.ETHERSCAN_API_KEY;

    queryData = { 
        "module": "account", 
        "action": "txlist", 
        "address": contractAddress, 
        "startblock": 0, 
        "endblock": 15537393, 
        "sort": "asc", 
        "apikey": etherscan_api_key 
    };

    queryString = encodeQueryData(queryData);
    queryUrl = [url, queryString].join("?");

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            process_etherscan_response(xmlHttp.responseText, "txlist");
    }
    xmlHttp.open("GET", queryUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};

