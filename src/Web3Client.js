import QFundingBuild from './contracts/QFunding.json'
const Web3 = require('web3')
let selectedAccount;

export const init = async() => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined'){
        //Metamask is installed

        //trying to connect the wallet

        provider.request({method: 'eth_requestAccounts'}).then((accounts) =>{
            console.log(accounts);
        })
        .catch((err) => {
            console.log(err);
        });

        //if the wallet account has been changed then console it

        window.ethereum.on('accountsChanged', function(accounts) {
            selectedAccount = accounts[0];
            console.log(`Selected account changed to ${selectedAccount}`);
          });
          }
          const providerUrl = process.env.PROVIDER_URL || 'http://localhost:8545';
          const web3 = new Web3(providerUrl);
      
          const networkId = await web3.eth.net.getId();
          const qFundingContract = new web3.eth.Contract(QFundingBuild.abi, QFundingBuild.networks[networkId].address)

    }