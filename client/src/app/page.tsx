import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
const Home: React.FC = () => {
    return (
        <main className='px-[2rem] py-[1rem] flex flex-col justify-between items-center'>
          <Hero/>
          <Services/>     
        </main>
    );
}

export default Home;