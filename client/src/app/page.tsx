"use client"
import { ethers } from "ethers";
import { requestEthAccounts } from "@/utils/BrowserProvider";
import { useContracts,ContractsContext } from "@/contexts/ContractsContext";
// import { useContext } from "react";
export default function Home() {
  const {p2pContract,liquidityPoolContract} = useContracts();
  // console.log(contracts)
  async function handleDepositing(){
    const signer=await requestEthAccounts()
    console.log(signer)
    const amountToSend = ethers.parseUnits("0.001", 18); // 0.1 ETH in wei
const options = { value: amountToSend };

const transaction = await liquidityPoolContract?.depositETH(options);
await transaction.wait();

console.log("Transaction complete:", transaction.hash);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div onClick={handleDepositing}>Click</div>
    </main>
  );
}
