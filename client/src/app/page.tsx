"use client"
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Home: React.FC = () => {
  const router =useRouter()
  useEffect(()=>{
    if(Cookies.get('currentAddress')){
      router.push('/p2p')
    }
  },[])
    return (
        <main className='px-[2rem] py-[1rem] flex flex-col justify-between items-center'>
          <Hero/>
          <Services/>     
        </main>
    );
}

export default Home;