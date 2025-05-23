// contexts/ContractsContext.ts
"use client"
import * as React from "react";
import { createContext, useContext, useEffect, useState } from 'react';
import { ethers,Contract } from 'ethers';
import data1 from '../app/artifacts/contracts/PeerToPeerLending.sol/PeerToPeerLending.json' 
import data2 from '../app/artifacts/contracts/LiquidityPool.sol/LiquidityPoolWithInterest.json'
interface Props{
    children:React.ReactNode
}
interface ContractsContextType {
    p2pContract: Contract | null;
    liquidityPoolContract: Contract | null;
  }
  export const ContractsContext = createContext<ContractsContextType>({ p2pContract: null, liquidityPoolContract: null });

export const ContractsProvider:React.FunctionComponent<Props> = ({ children }) => {
    const [contracts, setContracts] = useState<ContractsContextType>({ p2pContract: null, liquidityPoolContract: null });

    useEffect(() => {
        const initContracts = async () => {
            if(!window.ethereum){
                alert('Ethereum support is needed');
                return;
            }
            if(!window.ethereum.isMetaMask){
                alert('MetaMask support is needed');
                return;
            }
            console.log(process.env.NEXT_PUBLIC_SEPOLIA_URL)
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
    
            const contractABIs = {
                P2P: data1,
                LiquidityPool: data2,
            };
            const contractAddresses = {
                P2PAddress: '0x6fD906809D5CbD13508ed375C5771D8442Cb7a43',
                LiquidityPoolAddress: '0xD2575a51B5E8d905E17b00eDeC2e40c977216C44',
            };
    
            const p2pContract = new ethers.Contract(contractAddresses.P2PAddress, contractABIs.P2P.abi, signer);
            const liquidityPoolContract = new ethers.Contract(contractAddresses.LiquidityPoolAddress, contractABIs.LiquidityPool.abi, signer);
    
            setContracts({ p2pContract, liquidityPoolContract });
        };
    
        // Call the async function
        initContracts();
    }, []);
    

    return (
        <ContractsContext.Provider value={contracts}>
            {children}
        </ContractsContext.Provider>
    );
};

export const useContracts = () => useContext(ContractsContext);
