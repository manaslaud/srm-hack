"use client"
import Brain from "../utils/Brain"
import Brain2 from "../utils/Brain2"
import { Canvas } from "@react-three/fiber"
export default function Services(){
    return (
       <section className="w-full flex flex-col justify-center items-center gap-[2rem]" id="services">
        <h1 className="text-left text-white font-us w-full text-4xl">Our Services</h1>
         <section className="w-full laptop:flex-row mobile:flex-col flex border-[1px] justify-around gap-[3rem] items-center border-[#0f0f0f] rounded-[1rem] z-[1000000000000000] bg-[#000]">
                <div className="laptop:w-[25%] mobile:w-full aspect-square">
                <Canvas>
                <Brain/>   
                </Canvas>
                </div>
                <div className="text-white font-us font-bold laptop:text-2xl mobile:w-full mobile:text-lg mobile:px-[6px]  laptop:w-[60%]">
                Decentralized Lending: Experience the future of lending with Boltshift&apos;s fully decentralized platform. Our blockchain-based system eliminates the need for traditional financial intermediaries, allowing for secure and transparent peer-to-peer transactions.
                </div>
        </section>
         <section className="w-full laptop:flex-row mobile:flex-col flex border-[1px] justify-around gap-[3rem] items-center border-[#0f0f0f] rounded-[1rem] z-[1000000000000000] bg-[#000]">
         <div className="laptop:w-[25%] mobile:w-full aspect-square">
         <Canvas>
         <Brain2/>   
         </Canvas>
         </div>
         <div className="text-white font-us font-bold laptop:text-2xl mobile:w-full mobile:text-lg mobile:px-[6px]  laptop:w-[60%]">
         Automated Smart Contracts: Enjoy the security of automated smart contracts that ensure all terms are met before funds are exchanged. Our contracts are transparent, tamper-proof, and designed to protect both lenders and borrowers.
         </div>

 </section>
       </section>
    )
}