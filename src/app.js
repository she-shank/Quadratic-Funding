var Web3 = require('web3');
var QFundingContractAddress = "0x23as5d767ojbhvcyrytvu"

App = {
    load: async () => {
        await App.loadWeb3()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        // if (typeof web3 !== 'undefined') {
        // App.web3Provider = web3.currentProvider
        // web3 = new Web3(web3.currentProvider)
        // console.log("metamask initialized in web3")
        // } else {
        // window.alert("Please connect to Metamask.")
        // }
        // // Modern dapp browsers...
        // if (window.ethereum) {
        // window.web3 = new Web3(ethereum)
        // try {
        //     // Request account access if needed
        //     await ethereum.enable()
        //     // Acccounts now exposed
        //     web3.eth.sendTransaction({/* ... */})
        // } catch (error) {
        //     // User denied account access...
        // }
        // }
        // // Legacy dapp browsers...
        // else if (window.web3) {
        // App.web3Provider = web3.currentProvider
        // window.web3 = new Web3(web3.currentProvider)
        // // Acccounts always exposed
        // web3.eth.sendTransaction({/* ... */})
        // }
        // // Non-dapp browsers...
        // else {
        // console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        // }


        //check if metamask is insatalled or not
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');

            //metaamask getting started
            //if metamask installed then connect
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            //window.ethereum is the web3provider and creating web3 object
            var web3 = new Web3(window.ethereum);

            //loas=ding abi
            var abii;
            $.getJSON("../build/contracts/QFunding.json", function(json){
                abii = json;
            })

            //use abi to create contract
            var QFcontract = new web3.eth.Contract(abii, QFundingContractAddress)

            //make contract instance
            //var QFcontractInstance = QFcontract.at(QFundingContractAddress)

            //now QFcontractinstance can be called with the contract methods
            //fir example
            var projectOwnerAdress = "0xyctvuylsomething"
            var projectid = 456789 
            QFcontract.methods.createProject(projectOwnerAdress,projectid).send(
                {from:accounts[0]}
            )
            // QFcontractInstance.methods.createProject(projectOwnerAdress,projectid).send(
            //     {from:accounts[0]}
            // )
            //or 
            var bal = await QFcontract.methods.currentBal().send(
                {from:accounts[0]}
            )



        }else {
            console.log("metamask not found")
        }


          


    },
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})


