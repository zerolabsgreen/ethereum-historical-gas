var expect = require("chai").expect;
var request = require("request");

describe("Contract Gas Consumption API", function(){
    describe("Gas Consumption through Etherscan API", function(){

        var url = "http://localhost:3000/etherscanContractConsumption?contractAddress=0x283af0b28c62c092c9727f1ee09c02ca627eb7f5";

        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        
        it("returns ... [TO DEFINE]", function(done) {
            request(url, function(error, response, body) {
                // expect(body).to.equal("ffffff");
                done();
            })
        });
    })

})