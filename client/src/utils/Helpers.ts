import { ethers } from "ethers"

export function convertWeiToEther(wei:bigint){
    const weiString:string=(wei).toString()
    return ethers.formatEther(weiString)
}
export function convertEtherToWei(ether:string){
  return ethers.parseUnits(ether,"ether");
}