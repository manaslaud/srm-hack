"use client"
import { useContracts } from "@/contexts/ContractsContext";
import { useEffect, useState } from "react";
import { Loan } from "@/types";
import Cookies from "js-cookie";
import Particles from "@/sections/Particles";
import RequestLoanModal from "@/sections/RequestLoanModal";
import { unixToDate } from "@/utils/Helpers";
import { Navbar } from "@/sections/Hero";
export default function Home(){
    const { p2pContract, liquidityPoolContract } = useContracts();
    const [allLoans,setallLoans]=useState<Loan[]>([])
    const [allBorrowedLoans,setallBorrowedLoans]=useState<Loan[]>([])
    const [allLendedLoans,setallLendedLoans]=useState<Loan[]>([])
    const [requestLoanModal,showRequestLoanModal]=useState<boolean>(false);
    const userAddress=Cookies.get('currentAddress')
    const [metamaskIsConnected,setMetamaskIsConnected]=useState<boolean>(false);
    useEffect(()=>{
        if(Cookies.get('currentAddress')){
          setMetamaskIsConnected(true)
        }
      },[])
      const handleRequestLoan=async()=>{
        showRequestLoanModal(!requestLoanModal)
      }
    async function fetchAllLoans(n:any) {
          const indices = Array.from({ length: n+1 }, (_, index) => index);
              const loanPromises = indices.map(index => p2pContract?.loans(index));
        
          try {
            const loans = await Promise.all(loanPromises);
            return loans;
          } catch (error) {
            console.log("An error occurred while fetching loans:", error);
          }
        }
        //fetching all loans, updating allLoans state
    useEffect(()=>{
          const f=async()=>{
            if(!p2pContract) return
                const loanCounter:bigint=await p2pContract?.loanCounter();
                const data=  await fetchAllLoans(Number(loanCounter))
                data?.shift()
                //creating a state
                const loans:Loan[]=[]
                data?.map((data:any,index:number)=>{
                    const loan:Loan={
                        borrower:data.borrower,
                        lender:data.lender,
                        interestRate:Number(data.interestRate),
                        isRepaid:data.funded,
                        amount:Number(data.amount),
                        dueDate:Number(data.dueDate)
                    }
                    loans[index]=loan;
                })
                setallLoans(loans)
          }
         f()
        },[p2pContract])
        useEffect(()=>{
            //obtaining all borrowed loans
            const borrowedLoans:Loan[]=[]
            allLoans.map((loan:Loan,index:number)=>{
                if(loan.borrower==userAddress) borrowedLoans.push(loan)
            })
        setallBorrowedLoans(borrowedLoans)
            const lendedLoans:Loan[]=[]
            allLoans.map((loan:Loan,index:number)=>{
                if(loan.lender==userAddress) lendedLoans.push(loan)
            })
        setallLendedLoans(lendedLoans)
        console.log(borrowedLoans,lendedLoans)
        },[allLoans])

    return (
        <main className="w-full relative h-screen flex flex-col px-[2rem] py-[1rem] gap-[1rem]">
            <Navbar isMetamaskConnected={metamaskIsConnected}/>
        <Particles
            className="absolute inset-0 z-10 animate-fade-in w-full"
            quantity={250}
          />   
                      {requestLoanModal?<RequestLoanModal/>:""}
 
    <div className="w-full flex justify-between items-center z-[10000000000]">
    <h1 className="text-left text-white font-us w-full text-4xl">All loans</h1> 
    <button onClick={handleRequestLoan} className="px-[0.5rem] py-[0.5rem] rounded-[0.50rem] text-[0.7rem] font-us bg-blue-500">
                                Request Loan
                            </button>
    </div>
        <section className="w-full flex flex-wrap z-[100000000] gap-[1rem] bg-black">
        {
            allLoans.map((loan:Loan,index:number)=>{
                if(loan.lender=='0x0000000000000000000000000000000000000000')
                return (
                    <div key={index} className="flex flex-col w-[30.33%] justify-center items-center  border-[1px] font-ptMono border-[#0f0f0f] rounded-[1rem] py-[0.5rem]">
                    <p className="px-[1rem] py-[0.75rem] text-[0.80rem]">Loan Request by: <span>{loan.borrower}</span></p>
                    <p className="px-[1rem] py-[0.75rem] text-[0.80rem] w-full">Interest Rate: <span>{loan.interestRate}</span></p>
                    <p className="px-[1rem] py-[0.75rem] text-[0.80rem] w-full">Due date: <span>{unixToDate(loan.dueDate).toLocaleString()}</span></p>
                    <div className="w-full flex justify-center items-center">
                        <button className="px-[1rem] py-[0.5rem] rounded-[0.50rem] text-[0.8rem] font-us bg-blue-500">
                            View More
                        </button>
                    </div>
                </div>
                )
            })
        }
        </section>
        <h1 className="text-left text-white font-us w-full text-4xl">Your requested loans</h1> 
        <section className="w-full flex flex-wrap z-[100000000] gap-[1rem] bg-black">
        {
            allBorrowedLoans.map((loan:Loan,index:number)=>{
                return (
                    <div key={index} className="flex flex-col w-[30.33%] justify-center items-center  border-[1px] font-ptMono border-[#0f0f0f] rounded-[1rem] py-[0.5rem]">
                        <p className="px-[1rem] py-[0.75rem] text-[0.80rem]">Loan given by: <span>{loan.lender==='0x0000000000000000000000000000000000000000'?'Unfunded':loan.lender}</span></p>
                        <p className="px-[1rem] py-[0.75rem] text-[0.80rem] w-full">Interest Rate: <span>{loan.interestRate}</span></p>
                        <p className="px-[1rem] py-[0.75rem] text-[0.80rem] w-full">Due date: <span>{unixToDate(loan.dueDate).toLocaleString()}</span></p>
                        <div className="w-full flex justify-center items-center">
                            <button className="px-[1rem] py-[0.5rem] rounded-[0.50rem] text-[0.8rem] font-us bg-blue-500">
                                View More
                            </button>
                        </div>
                    </div>
                )
            })
        }
        </section>
        <h1 className="text-left text-white font-us w-full text-4xl">Your lended loans</h1> 
        <section className="w-full flex flex-wrap z-[100000000] gap-[1rem] bg-black">
        {
            allLendedLoans.map((loan:Loan,index:number)=>{
                return (
                    <div key={index} className="flex flex-col w-[30.33%] justify-center items-center  border-[1px] font-ptMono border-[#0f0f0f] rounded-[1rem] py-[0.5rem]">
                        <p className="px-[1rem] py-[0.75rem] text-[0.80rem]">Loan Request by: <span>{loan.borrower}</span></p>
                        <p className="px-[1rem] py-[0.75rem] text-[0.80rem] w-full">Interest Rate: <span>{loan.interestRate}</span></p>
                        <p className="px-[1rem] py-[0.75rem] text-[0.80rem] w-full">Due date: <span>{unixToDate(loan.dueDate).toLocaleString()}</span></p>
                        <div className="w-full flex justify-center items-center">
                            <button className="px-[1rem] py-[0.5rem] rounded-[0.50rem] text-[0.8rem] font-us bg-blue-500">
                                View More
                            </button>
                        </div>
                    </div>
                )
            })
        }
        </section>
        
        </main>
    )
}
// const [loanAmount, setLoanAmount] = useState<string>('');
// const [interestRate, setInterestRate] = useState<string>('');
// const [loanDuration, setLoanDuration] = useState<string>('');
// const [loanId, setLoanId] = useState<string>('');
// const [repayAmount, setRepayAmount] = useState<string>('');
// async function fetchAllLoans(n:any) {
//   const indices = Array.from({ length: n+1 }, (_, index) => index);
//       const loanPromises = indices.map(index => p2pContract?.loans(index));

//   try {
//     const loans = await Promise.all(loanPromises);
//     return loans;
//   } catch (error) {
//     console.log("An error occurred while fetching loans:", error);
//   }
// }

// useEffect(()=>{
//   const f=async()=>{
//     if(!p2pContract) return
//     // const loanCounter:bigint=await p2pContract?.loanCounter();
//     // const data=  await fetchAllLoans(Number(loanCounter))
    
//     // if(data) {
//     //    console.log((Number(data[4].interestRate)*Number(convertWeiToEther(data[4].amount))/100) +Number(convertWeiToEther(data[4].amount)) )
//     const address= (await getSigner()).address
//     const data=await p2pContract?.getAllLendingLoans(address)
//     console.log(data)
       
//   }
//   f()
// },[p2pContract])

// const requestLoan = async () => {
//     try {
//         const transaction = await p2pContract!.requestLoan(
//             ethers.parseEther(loanAmount),
//             Number(interestRate),
//             Number(loanDuration) * 86400 
//         );
//         await transaction.wait();
//         alert('Loan requested successfully!');
//     } catch (error) {
//         console.error(error);
//         alert('Request loan failed!');
//     }
// }

// const fundLoan = async () => {
//     try {
//         const transaction = await p2pContract!.fundLoan(
//             Number(loanId),
//             { value: ethers.parseEther(loanAmount) }
//         );
//         await transaction.wait();
//         alert('Loan funded successfully!');
//     } catch (error) {
//         console.error(error);
//         alert('Fund loan failed!');
//     }
// }

// const repayLoan = async () => {
//     try {
//         const transaction = await p2pContract!.repayLoan(
//             Number(loanId),
//             { value: ethers.parseEther(repayAmount) }
//         );
//         await transaction.wait();
//         alert('Loan repaid successfully!');
//     } catch (error) {
//         console.error(error);
//         alert('Repay loan failed!');
//     }
// }