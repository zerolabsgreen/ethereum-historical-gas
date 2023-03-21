#zelagac

ZEroLAbs GAs Consumption. The goal is to fetch the data consonsumption for any given smart contract until [Ethereum's merge from PoW to PoS](https://www.investopedia.com/the-ethereum-merge-6504132). This consumption should be split up by day and type of transaction (inbound, outbound and internal).

## Etherscan approach

Fetch the data from the [Etherscan API](https://etherscan.io/apis). To make it work, first create an etherscan API key, then store it under a `.env` file containing a line `ETHERSCAN_API_KEY="YOUR_API_KEY"`. A free API access is enough (as for the time writing this).

The function `getEtherscanData()` in [src/fetcher.js](src/fetcher.js) then executes the queries fetching the data.

## Web server

Just run `node app/server.js` in a terminal window to run the web server, that will then run on port `3000` of `localhost`, as defined in [app/server.js](app/server.js). From there, you can get the data for a specific contract with e.g. following query: `http://localhost:3000/etherscanContractConsumption?contractAddress=0x283af0b28c62c092c9727f1ee09c02ca627eb7f5`. The endpoint is `etherscanContractConsumption` taking `contractAdress` as query parameter.

## test

Just run `npm test`.
