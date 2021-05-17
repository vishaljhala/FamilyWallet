const Wallet = artifacts.require("FamilyWallet");
const chai = require("./chai-common-setup.js");
const BN = web3.utils.BN;
const expect = chai.expect;
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

contract("FamilyWallet tests", async accounts => {
  const [ head, member1, member2] = accounts;
  
  describe("Budget", async () => {
    it("throws exception if any one other than owner adds allowance", async () => {
      const wallet = await Wallet.deployed();
      await expectRevert.unspecified(
        wallet.addAllowance(member1, BigInt(10**18), {from: member2})
      );
    });
    
    it("allows owner to adds allowance", async () => {
      const wallet = await Wallet.deployed();
      await wallet.addAllowance(member1, BigInt(10**18), {from: head});
      allowance = await wallet.allowance(member1);
      allowance = await web3.utils.fromWei(allowance, 'ether');
      expect(allowance).to.eq('1');
    });
  });
  
  describe("Withdrawl", async () => {
    it("throws exception if withdrawl amount is > allowance", async () => {
      const wallet = await Wallet.deployed();
      await wallet.addAllowance(member1, BigInt(10**18), {from: head});
      await expectRevert.unspecified(
        wallet.withdrawMoney(member1, BigInt(2*(10**18)), {from: member1})
      );
    });
    
    it("allows withdrawl if amount less than allowance and reduces allowance", async () => {
      const wallet = await Wallet.deployed();
      await wallet.addAllowance(member1, BigInt(10**18), {from: head});
      await wallet.send(2*(10**18), {from:head});
      await wallet.withdrawMoney(member1, BigInt(0.5*(10**18)), {from: member1})
      allowance = await wallet.allowance(member1);
      allowance = await web3.utils.fromWei(allowance, 'ether');
      expect(allowance).to.eq('0.5');
    });
  });
});
