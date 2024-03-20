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
  if(!window.ethereum) {
  alert('Need eth support')
return;}
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3Provider = new ethers.BrowserProvider(window.ethereum);
    return await web3Provider.getSigner();
}