"use client"
import Brain from "../utils/Brain"
import Brain2 from "../utils/Brain2"
import { Canvas } from "@react-three/fiber"
export default function Services(){
    return (
       <section className="w-full flex flex-col justify-center items-center gap-[2rem]" id="services">
        <h1 className="text-left text-white font-us w-full text-4xl">Our Services</h1>
         <section className="w-full flex border-[1px] justify-around gap-[3rem] items-center border-[#0f0f0f] rounded-[1rem] z-[1000000000000000] bg-[#000]">
                <div className="w-[25%] aspect-square">
                <Canvas>
                <Brain/>   
                </Canvas>
                </div>
                <div className="text-white font-us font-bold text-2xl w-[60%]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus saepe ea soluta odit fugiat, voluptates officiis, dolorem illum expedita ratione, sint aliquid corporis dolor delectus recusandae ipsum asperiores libero doloremque.
                </div>
        </section>
         <section className="w-full flex border-[1px] justify-around gap-[3rem] items-center border-[#0f0f0f] rounded-[1rem] z-[1000000000000000] bg-[#000]">
        
         <div className="text-white font-us font-bold text-2xl w-[60%]">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus saepe ea soluta odit fugiat, voluptates officiis, dolorem illum expedita ratione, sint aliquid corporis dolor delectus recusandae ipsum asperiores libero doloremque.
         </div>
         <div className="w-[25%] aspect-square">
         <Canvas>
         <Brain2/>   
         </Canvas>
         </div>
 </section>
       </section>
    )
}