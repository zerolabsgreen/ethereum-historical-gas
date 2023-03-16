var expect = require("chai").expect;
var fetcher = require("../src/fetcher");

var testAddress = "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5"

describe("Fetching data from etherscan", () => {
    it(`Fetching for address ${testAddress}`, (done) => {
        var etherscan_gas_consumption = fetcher.getEtherscanData(testAddress);
        console.log(etherscan_gas_consumption);
        done();
    })
})