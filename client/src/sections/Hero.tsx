import Image from "next/image"
export default function Hero(){
    return (
        <section className="w-full flex flex-col ">
        <Navbar/>
        </section>
    )
}
function Navbar(){
    return (
        <nav className="w-full flex justify-between items-center text-white flex-row font-ptMono border-[1px]  border-[#0f0f0f] rounded-[1rem] px-[1rem] py-[.5rem]" >
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