Family Wallet
----------------
FamilyWallet is a Ethereum smart contract.  
Head of the family can allocate spending budgets to members.  
Members can withdraw amount lower than allocated budget.  
Their budget allocation reduces each time they withdraw.  
Contract owner can allocate more funds to withdraw per family member.  



Setup
-----

npm install --save solc  
npm install --save mocha ganache-cli  
npm install --save chai chai-bn chai-as-promised  
npm install --save web3  
npm install -g truffle  
npm install --save-dev @openzeppelin/contracts  

git remote add origin https://github.com/vshaljhala/FamilyWallet.git  
git pull  

Compile
-------------
truffle compile

Test
------
truffle develop   
truffle test  

