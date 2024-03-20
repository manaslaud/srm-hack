"use client"
import { useContracts } from "@/contexts/ContractsContext";
import { useEffect, useState } from "react";
import { Loan } from "@/types";
import { unixToDate } from "@/utils/Helpers";
export default function Home(){
    const { p2pContract, liquidityPoolContract } = useContracts();
    const [allLoans,setallLoans]=useState<Loan[]>([])
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

    return (
        <main className="">

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