import { ethers } from "ethers";
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
export async function getSigner() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3Provider = new ethers.BrowserProvider(window.ethereum);
    return web3Provider.getSigner();
}