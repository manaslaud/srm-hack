const RequestLoanModal:React.FunctionComponent=()=>{
    return (
        <main className="top-0 w-[75%] flex flex-col gap-[1rem] justify-center items-center z-[1000000000] left-[50%] translate-x-[15%] bg-[#0f0f0f] px-[1rem] py-[0.3rem] rounded-[10px]">
            <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-center text-white font-us w-full text-3xl">Request a loan</h1> 
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ducimus tempore minus officiis ?</p>
        <div className="w-full flex gap-[1rem] justify-center items-center flex-col">
        <label htmlFor="ether">Ether amount</label>
        <input type="text" placeholder="Enter ether" name="ether" className="bg-transparent rounded-[1rem] px-[1rem] py-[0.3rem]"/>
        <label htmlFor="ether">Interest Rate</label>
        <input type="text" placeholder="Enter interest rate" name="ether" className="bg-transparent rounded-[1rem] px-[1rem] py-[0.3rem]"/>
        <label htmlFor="ether">Duration in days</label>
        <input type="text" placeholder="Enter days" name="ether" className="bg-transparent rounded-[1rem] px-[1rem] py-[0.3rem]"/>
        </div>
            </div>

        </main>
    )
}
export default RequestLoanModal