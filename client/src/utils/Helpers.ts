import { ethers } from "ethers"
export function convertWeiToEther(wei:bigint){
    const weiString:string=(wei).toString()
    return ethers.formatEther(weiString);
}
export function convertEtherToWei(ether:string){
  return ethers.parseUnits(ether,"ether");
}
export function unixToDate(unix:number){
  const dt=new Date(Math.ceil(unix*1000))
  return dt;
}
export function DayToUnix(days: number): number {
  const today = new Date();
  const futureDate = new Date(today); // Create a new Date object
console.log(today.getDate() + days)
  futureDate.setDate(today.getDate() + days); // Safely add days
  console.log(futureDate)

  const unixTimestamp = Math.floor(futureDate.getTime() / 1000);

  return unixTimestamp;
}
