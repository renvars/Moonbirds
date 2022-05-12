

document.querySelector(".plus").onclick = function incrementMint() {

        var test = document.querySelector(".mint-amount")
        var mintVal = parseInt(test.innerHTML);
        if (mintVal < 5) {
            mintVal += 1
        }
        test.innerHTML = mintVal



};

document.querySelector(".minus").onclick = function decrementMint() {

        var test = document.querySelector(".mint-amount")
        var mintVal = test.innerHTML;
        if (mintVal > 1) {
            mintVal -= 1
        }
        test.innerHTML = mintVal


};


var accountouter;
var contract = null;
const ABI = [];
const ADDRESS = "";
let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
(async() => {
    
  
    // https://docs.walletconnect.com/quick-start/dapps/web3-provider

    if (typeof window.ethereum !== "undefined") {
        let account;
        document.querySelector(".connect-web3").addEventListener(touchEvent,
          async() => {
            console.log("requesting metamask")
            if (window.ethereum) {
                await window.ethereum.send("eth_requestAccounts");
                window.web3 = new Web3(window.ethereum);

                var accounts = await web3.eth.getAccounts();
                account = accounts[0];
                accountouter = account


                contract = new web3.eth.Contract(ABI, ADDRESS);
                // const newItem = document.createElement('p');
                // newItem.innerHTML = account
                // var button = document.getElementById("connect")
                // button.parentNode.replaceChild(newItem, button)

                if (contract) {
                  document.querySelector(".connect-web3").innerHTML = "Mint"
                  document.querySelector(".mint-amount").innerHTML = "1"
                  document.querySelector(".mint-amount").style.fontSize = "2rem"
                    
                  let isWhitelisted = await checkWhitelisted(contract,account)
                  let onlyWhitelsited = await onlyWhitelistedMint(contract)
                  document.querySelector(".connect-web3").onclick = () => {
                      var mint_amnt = parseInt(document.querySelector(".mint-amount").innerHTML)
                      if(onlyWhitelsited){

                        if(isWhitelisted){
                            contract.methods.mint(mint_amnt).send({ from: account, value: String(mint_amnt *0) })
                        }else{
                            alert("You are not whitelsited!")
                        }
                      }else{
                        contract.methods.mint(mint_amnt).send({ from: account, value: String(mint_amnt *0) })
                      }
                      
                  }
            
              }

            }
        }) 
    } else {
      let account;
        
        var provider = new WalletConnectProvider.default({
            rpc: {
                1: "https://cloudflare-eth.com/", // https://ethereumnodes.com/
                137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
                // ...

            },
            // bridge: 'https://bridge.walletconnect.org',
        });
        document.querySelector(".connect-web3").addEventListener(touchEvent,
          async() => {
            await provider.enable();

            //  Create Web3 instance
            const web3 = new Web3(provider);
            window.w3 = web3

            var accounts = await web3.eth.getAccounts(); // get all connected accounts
            account = accounts[0]; // get the primary account
            accountouter = account
            if(account !== undefined){
                document.querySelector(".connect-web3").innerHTML = "Mint"
                document.querySelector(".mint-amount").innerHTML = "1"
                document.querySelector(".mint-amount").style.fontSize = "2rem"
            }
            
        })


        var sign = async(msg) => {
            if (w3) {
                return await w3.eth.personal.sign(msg, account)
            } else {
                return false
            }
        }

        var contract = async(ABI, ADDRESS) => {
            if (w3) {
                return new w3.eth.Contract(ABI, ADDRESS)
            } else {
                return false
            }
        }

        var disconnect = async() => {
            // Close provider session
            await provider.disconnect()
        }


        document.querySelector(".connect-web3").addEventListener(touchEvent,async() => {
          let mintContract =  await contract(ABI,ADDRESS)
          var mint_amnt = parseInt(document.querySelector(".mint-amount").innerHTML)
          let isWhitelisted = await isWhitelisted(mintContract,account)
          let onlyWhitelsited = await onlyWhitelistedMint(mintContract)
          if(onlyWhitelsited){

            if(isWhitelisted){
                mintContract.methods.mint(mint_amnt).send({ from: account, value: String(mint_amnt *0) })
            }else{
                alert("You are not whitelsited!")
            }
          }else{
            mintContract.methods.mint(mint_amnt).send({ from: account, value: String(mint_amnt *0) })
          }
          
        })



    }

    
})();

async function checkWhitelisted(contract,address){
    let value = await contract.methds.isWhitelisted(address).call()
    return value
}
async function whitelistedOnly(contract){
    let value = await contract.methds.onlyWhitelistedMint().call()
    return value
}