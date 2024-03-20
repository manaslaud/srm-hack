"use client"
import React, { useState } from 'react';
import { useContracts } from "@/contexts/ContractsContext";
import { ethers } from 'ethers'; 
import { getSigner } from '@/utils/BrowserProvider';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
const LiquidityInteraction: React.FC = () => {
    const { liquidityPoolContract } = useContracts();
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    useEffect(()=>{
        window.ethereum.on("accountsChanged",async()=>{
            window.location.reload();
            const acc=await getSigner()
            if(acc)
            Cookies.set('currentAddress',acc?.address)
          })
          window.ethereum.on("chainChanged",async()=>{
            window.location.reload();
            const acc=await getSigner()
            if(acc)
            Cookies.set('currentAddress',acc?.address)
          })
    },[])
    const depositETH = async () => {
        if (!liquidityPoolContract || depositAmount === '') return;

        try {
            const tx = await liquidityPoolContract.depositETH({ value: ethers.parseEther(depositAmount) });
            await tx.wait();
            setTransactionHash(tx.hash);
            console.log('Deposit successful:', tx);
        } catch (error) {
            console.error('Error depositing ETH:', error);
        }
    };

    const withdrawETH = async () => {
        if (!liquidityPoolContract || withdrawAmount === '') return;

        try {
            const mtTokenAmount = withdrawAmount // Adjust as necessary
            const tx = await liquidityPoolContract.withdrawETH(mtTokenAmount);
            await tx.wait();
            setTransactionHash(tx.hash);
            console.log('Withdrawal successful:', tx);
        } catch (error) {
            console.error('Error withdrawing ETH:', error);
        }
    };

    return (
        <main className="w-full p-4 flex flex-col gap-4 items-center bg-black text-white">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-4xl font-bold">Liquidity Pool</h1>
                <button onClick={depositETH} className="px-4 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-700 transition">
                    Deposit ETH
                </button>
            </div>

            <input
                type="text"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Amount in ETH to Deposit"
                className="w-full p-2 rounded-md bg-gray-800"
            />

            <input 
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Amount in MT Token to Withdraw"
                className="w-full p-2 rounded-md bg-gray-800"
            />

            <button onClick={withdrawETH} className="px-4 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-700 transition">
                Withdraw ETH
            </button>

            {transactionHash && <div className="mt-4 p-2 bg-green-800 rounded-md">Transaction Hash: {transactionHash}</div>}
        </main>
    );
};

export default LiquidityInteraction;