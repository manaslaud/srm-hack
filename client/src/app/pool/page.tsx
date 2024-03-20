export default function Home(){
    window.ethereum.on("accountsChanged",()=>{
        window.location.reload();
      })
      window.ethereum.on("chainChanged",()=>{
        window.location.reload();
      })
    return (
        <main>
            
        </main>
    )
}