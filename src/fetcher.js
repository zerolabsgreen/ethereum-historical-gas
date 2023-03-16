var dotenv = require("dotenv");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

dotenv.config()

var url = "https://api.etherscan.io/api"


function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }

function process_etherscan_response(resp, queryType) {
    gas_consumption = {};
    console.log("process_etherscan_response(), queryType: " + queryType);
    const json_resp = JSON.parse(resp);
    if (json_resp["status"] != 1) {
        console.log("[ERROR] Problem with response: " + json_resp["message"]);
        return gas_consumption;
    }
    const tx_list = json_resp["result"];
    tx_list.forEach((tx, _) => {
        ts = tx["timeStamp"];
        var dateFormat = new Date(ts * 1000);
        var dateStr = dateFormat.getUTCFullYear() + "-" + (dateFormat.getUTCMonth() + 1) + "-" + dateFormat.getUTCDate();
        if (!(dateStr in gas_consumption)) gas_consumption[dateStr] = {"gasUsed": 0};
        gas_consumption[dateStr]["gasUsed"] += parseInt(tx["gasUsed"]);
    });
    return gas_consumption;
 }
 

function getEtherscanData(contractAddress) {
    etherscan_api_key = process.env.ETHERSCAN_API_KEY;

    queryData = { 
        "module": "account", 
        "address": contractAddress, 
        "startblock": 0, 
        "endblock": 15537393, 
        "sort": "asc", 
        "apikey": etherscan_api_key 
    };

    etherscan_gas_consumption = {};
    actions = ["txlist", "txlistinternal"];
    actions.forEach( (action, _) => {
        queryData["action"] = action;
        queryString = encodeQueryData(queryData);
        queryUrl = [url, queryString].join("?");

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                var gas_consumption_action = process_etherscan_response(xmlHttp.responseText, action);
                etherscan_gas_consumption[action] = gas_consumption_action;
                // return gas_consumption_action;
        }
        xmlHttp.open("GET", queryUrl, false); // true for asynchronous
        xmlHttp.send(null);
    });
    
    return etherscan_gas_consumption;
};

exports.getEtherscanData = getEtherscanData;