pragma solidity >=0.4.22 <0.9.0;

contract MecToken{
    string public name = 'Mec Coin';
    string public symbol = 'MEC';
    string public standard = 'Mec Coin v1.0';
    uint256 public totalSupply; //state variable
    mapping(address => uint256) public balanceOf;
    constructor(uint256 _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;

    }
    function tranfer(address _to, uint256 _value) public returns(bool success){
        require(balanceOf[msg.sender]>= _value);
        

    }

}
