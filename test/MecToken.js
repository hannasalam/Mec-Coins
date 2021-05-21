var MecToken = artifacts.require("./MecToken.sol");
contract('MecToken',function(accounts){
    var tokenInstance;

    it('initializes the contract with the correct values', ()=>{
        return MecToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(name=>{
            assert.equal(name,'Mec Coin','has the correct name');
            return tokenInstance.symbol();
        }).then(symbol=>
            {
                assert.equal(symbol,'MEC', 'has correct symbol');
                return tokenInstance.standard();
            }).then(standard=>{
                assert.equal(standard,'Mec Coin v1.0', 'has the correct standard');
            }); 
    });

    it('allocates the total supply upon deployment',function(){
        return MecToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(totalSupply=>{
            assert.equal(totalSupply.toNumber(),1000000,'sets the total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]); 
        }).then(adminBalance=>{
            assert.equal(adminBalance.toNumber(),1000000,'it allocates to the initial supply to the admin');
        });
        });


    it('transfers ownership',function(){
        return MecToken.deployed().then(instance=>{
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 9999999999);
    }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
    }).then(receipt=>{
        return tokenInstance.balanceOf(accounts[1]);
    }).then(balance=>
        {
            assert.equal(balance.toNumber(),250000,'adds to the amount recieved');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(balance=>
            {
                assert.equal(balance.toNumber(),750000,'deducts the amount from the sending account')
            });
});

    });

