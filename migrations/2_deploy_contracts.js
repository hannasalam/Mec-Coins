var MecToken = artifacts.require("./MecToken");

module.exports = function (deployer) {
  deployer.deploy(MecToken, 1000000);
};
