"use client"
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Cookies from "js-cookie";
import { getSigner } from "@/utils/BrowserProvider";

import { useEffect,useState } from "react";
const Home: React.FC = () => {
 useEffect(()=>{
  window.ethereum.on("accountsChanged",async()=>{
    window.location.reload();
    const acc=await getSigner()
    if(acc)
    Cookies.set('currentAddress',acc?.address)
  })
  window.ethereum.on("chainChanged",()=>{
    window.location.reload();
  })
 },[])
  const [metamaskIsConnected,setMetamaskIsConnected]=useState<boolean>(false)
  useEffect(()=>{
    if(Cookies.get('currentAddress')){
      setMetamaskIsConnected(true)
    }
  },[])
    return (
        <main className='px-[2rem] py-[1rem] flex flex-col justify-between items-center'>
          <Hero isMetamaskConnected={metamaskIsConnected}/>
          <Services/> 
          <Footer/>    
        </main>
    );
}

export default Home;