"use client"
import { ethers } from "ethers";
import { getSigner } from "@/utils/BrowserProvider";
import { useContracts,ContractsContext } from "@/contexts/ContractsContext";
// import { useContext } from "react";
export default function Home() {
  const {p2pContract,liquidityPoolContract} = useContracts();
  // console.log(contracts)
  async function handleDepositing(){
    const signer=await getSigner()
    console.log(signer)
    const amountToSend = ethers.parseUnits("0.001", 18); 
    const txn= await liquidityPoolContract?.depositETH({value:amountToSend})
   await txn.wait()
    //11000000000000000n
    
  }
  async function handleWithdraw(){
    const signer=await getSigner()
    console.log(signer)
    // const res=await liquidityPoolContract?.withdrawETH(ethers.parseUnits("0.001", 18))
    // console.log(res)
   const data= await liquidityPoolContract?.userDeposits(signer.address);
   console.log(ethers.formatEther(data))
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div onClick={handleDepositing}>Click</div>
    <div onClick={handleWithdraw}>Get all deposits</div>
    </main>
  );
}
