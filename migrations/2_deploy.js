const FamilyWallet = artifacts.require("FamilyWallet");

module.exports = async function (deployer) {
  await deployer.deploy(FamilyWallet);
};
