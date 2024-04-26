import { ChangeEvent, useState } from "react"
import { convertEtherToWei } from "@/utils/Helpers"
import { useContracts } from "@/contexts/ContractsContext"
import { DayToUnix } from "@/utils/Helpers"
const RequestLoanModal:React.FunctionComponent=()=>{
    const [ether,setEther]=useState<string>('')
    const [interest,setInterest]=useState<string>('')
    const [duration,setDuration]=useState<string>('')
    const {p2pContract}=useContracts()

    const handleSubmit=async(formData:any)=>{
        formData.preventDefault()
        console.log(formData)
        if(Number(ether)<0 || Number(duration)<0 || Number(interest)<0) alert('ALl values must be positive')
        const txn=await p2pContract?.requestLoan(convertEtherToWei(Number(ether).toString()),Number(interest),Number(duration)*24*60*60)
         await txn.wait()
         console.log(txn)
    }
    return (
        <main className="top-0 w-[75%] flex flex-col gap-[1rem] justify-center items-center z-[1000000000] left-[50%] translate-x-[15%] bg-[#0f0f0f] px-[1rem] py-[0.3rem] font-us rounded-[10px]">
            <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-center text-white font-us w-full text-3xl">Request a loan</h1> 
        <p className="font-ptMono">Enter loan amount (in ether), interest rate and loan duration in days</p>
            <form onSubmit={handleSubmit} >
            <div className="w-full flex gap-[1rem] justify-center items-center flex-col">
        <div className="flex flex-col gap-[1rem] justify-center items-start">
        <label htmlFor="ether" className="px-[1rem] py-[0.3rem] font-us">Ether amount</label>
        <input step={0.00000001} type="number" placeholder="Enter ether" name="ether" className="bg-transparent rounded-[1rem] px-[1rem] py-[0.3rem] " onChange={(e:ChangeEvent<HTMLInputElement>)=>{
            setEther(e.target.value)
        }}/>
        </div>
        <div className="flex flex-col gap-[1rem] justify-center items-start">
        <label className="px-[1rem] py-[0.3rem] font-us" htmlFor="ether">Interest Rate</label>
        <input step={0.00000001} type="number" placeholder="Enter interest rate" name="ether" className="bg-transparent rounded-[1rem] px-[1rem] py-[0.3rem] " onChange={(e:ChangeEvent<HTMLInputElement>)=>{
            setInterest(e.target.value)
        }}/>
        </div>
       <div className="flex flex-col gap-[1rem] justify-center items-start">
       <label className="px-[1rem] py-[0.3rem] font-us" htmlFor="ether">Duration in days</label>
        <input step={0.00000001} type="number" placeholder="Enter days" name="ether" className="bg-transparent rounded-[1rem] px-[1rem] py-[0.3rem] " onChange={(e:ChangeEvent<HTMLInputElement>)=>{
            setDuration(e.target.value)
        }}/>
       </div>
        </div>
<div className="w-full flex justify-center items-center py-[1rem]">
<button type="submit" className="px-[0.5rem] py-[0.5rem] rounded-[0.50rem] text-[0.9rem] w-[50%] font-us bg-blue-500">Submit</button>
</div>            </form>
            </div>

        </main>
    )
}
export default RequestLoanModal