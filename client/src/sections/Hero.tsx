import Image from "next/image"
import Particles from "./Particles"
export default function Hero(){
    return (
        <section className="w-full flex flex-col relative overflow-hidden h-screen">
        <Navbar/>
        <Particles
            className="absolute inset-0 z-10 animate-fade-in"
            quantity={1050}
          />
        </section>
    )
}
function Navbar(){
    return (
        <nav className="w-full flex justify-between items-center text-white flex-row font-ptMono border-[1px]  border-[#0f0f0f] rounded-[1rem] px-[1rem] py-[.5rem] bg-[#000] z-[1000000000000000]" >
           
                {/* <div className="">Logo</div> */}
                <Image className="cursor-pointer" width={100} height={100} src={'/logo.svg'} alt="Logo"/>
                <div className="w-[40%] flex justify-between items-center text-[0.9rem] cursor-pointer">
                    <span>Home</span>
                    <span>About us</span>
                    <span>Contact Us</span>
                    <button className="px-[1rem] py-[.5rem]  transition-all duration-400 hover:text-[#fd6220] hover:border-[#fd6220]">Connect Metamask</button>
                </div>
        </nav>
    )
}