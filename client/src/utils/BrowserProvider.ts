import { BrowserProvider } from "ethers";
import { ethers } from "ethers";
// import { useRouter } from "next/navigation";
export const  requestEthAccounts=async()=>{
    const provider:BrowserProvider = new ethers.BrowserProvider(window.ethereum);
    // const router=useRouter()
    if(!provider){
        alert('Need metamask supprt')
        return;
      }
      if(provider && window.ethereum){
        await provider.send("eth_requestAccounts",[]).then((obj:any)=>{
        
        }).catch((e:any)=>{
        //   console.log(e)
        });
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        })
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        })
}
const signer = await provider.getSigner();
return signer
}
export const checkMetamaskAndEth=()=>{
    if(!window.ethereum){
        alert('Need ethereum supprt')
      }
      else{
        if(!window.ethereum.isMetaMask){
          alert('Need metamask supprt')
        }
      }
}