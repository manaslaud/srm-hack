"use client"
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Cookies from "js-cookie";
import { useEffect,useState } from "react";
const Home: React.FC = () => {
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
        </main>
    );
}

export default Home;