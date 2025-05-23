"use client"
import Image from "next/image"
import Link from "next/link"
import Particles from "./Particles"
import { getSigner } from "@/utils/BrowserProvider"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
interface HeroProps{
    isMetamaskConnected:boolean;
}
export default function Hero(props:HeroProps){
    const router=useRouter()
    async function handleCLick(){
        if(props.isMetamaskConnected){
            router.push('/p2p')
            return;
        }
        const signer=await getSigner();
        console.log(signer)
        Cookies.set('currentAddress',signer!.address)
    }
    return (
        <section className="w-full flex flex-col relative overflow-hidden h-screen " id="hero">
        <Navbar isMetamaskConnected={props.isMetamaskConnected}/>
        <Particles
            className="absolute inset-0 z-10 animate-fade-in w-full"
            quantity={1050}
          />
          <div className="flex text-white absolute text-5xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  font-us align-middle justify-center items-center flex-col z-[1000000000000000] gap-[0.5rem]">
<p className="text-center">Simplifying loading in the <br /> DeFi world <span className="bg-gradient-to-r from-indigo-700 via-purple-300 to-pink-400 bg-clip-text text-transparent">BoltShift.</span>
</p>
<button onClick={handleCLick} className="text-[0.7rem] px-[1rem] py-[0.5rem] rounded-[1rem] cursor-pointer btn-grad hover:bg-left-bottom z-[1000000000000000]">{props.isMetamaskConnected?'Start Loaning':'Connect Wallet'}</button>
          </div>
         
        </section>
    )
}
export function Navbar(props:HeroProps){
    return (
        <nav className="w-full flex justify-between items-center text-white flex-row font-ptMono border-[1px]  border-[#0f0f0f] rounded-[1rem] px-[1rem] py-[.5rem] bg-[#000] z-[1000000000000000]" >
           
                {/* <div className="">Logo</div> */}
                <Image className="cursor-pointer" width={100} height={100} src={'/logo.svg'} alt="Logo"/>
                {props.isMetamaskConnected?(<div className="w-[40%] flex justify-between items-center text-[0.9rem] cursor-pointer">
                    <p className="font-us w-full text-right">Wallet:{Cookies.get('currentAddress')}</p>
                </div>):(<div className="w-[20%] flex justify-between items-center text-[0.9rem] cursor-pointer">
                    <Link href={'/#home'}><span>Home</span></Link>          
                    <Link href={'/#services'}><span>Services</span></Link>
                    <Link href={'/#contact'}><span>Contact us</span></Link>
                </div>)}
        </nav>
    )
}
// 
