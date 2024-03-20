import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-8 px-4 lg:px-12 py-8 bg-black text-white">
      <section className="flex flex-col justify-between gap-4 w-full lg:w-auto">
        <div className="text-2xl border-2 border-gray-700 rounded-full px-7 py-7 text-center ">
          MENU
        </div>
        <div className="flex flex-col gap-4 px-12 py-7 border-2 border-gray-700 rounded-2xl text-opacity-80 justify-center items-center">
          <div>Home</div>
          <div>Services</div>
          <div>Team</div>
        </div>
      </section>
      <section className="flex flex-col w-full lg:w-2/3 justify-between gap-4">
        <div className="h-full w-full flex justify-center items-center border-2 border-gray-700 rounded-2xl overflow-hidden relative ">
          <Image
            alt="DeFi Logo"
            src={"/hero/defiLogo.svg"} // Change to your DeFi project logo
            layout="fill" // Changed to fill layout to cover the space
            objectFit="cover" // Changed to cover to make sure the image covers the area nicely
          />
        </div>
        <div className="flex flex-col gap-4 items-center w-full" id="contactus">
          <div className="px-12 py-7 font-mono text-opacity-80 flex flex-col gap-4 text-2xl border-2 border-gray-700 rounded-2xl w-full text-center">
            <div className="text-3xl">Contact Us</div>
            <div>shreyasinghhhh1354@gmail.com</div>
            <div>9082532164</div>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-between gap-4 w-full lg:w-auto">
        <div className="text-2xl border-2 border-gray-700 rounded-full px-7 py-7 text-center ">
          LINKS
        </div>
        <div className="flex flex-col gap-4 px-12 py-7 border-2 border-gray-700 rounded-2xl text-opacity-80 justify-center items-center">
          <SocialLink platform="Twitter" icon="/icons/twitter.svg" />
          <SocialLink platform="LinkedIn" icon="/icons/linkedin.svg" />
          <SocialLink platform="YouTube" icon="/icons/youtube.svg" />
          <SocialLink platform="Instagram" icon="/icons/instagram.svg" />
        </div>
      </section>
    </footer>
  );
}

interface props{
    platform:any,
    icon:any
}
const SocialLink:React.FunctionComponent<props> = ({ platform, icon }) => (
  <div className="flex justify-center items-center gap-2">
    <p>{platform}</p>
    <Image width={20} height={20} src={icon} alt={platform} />
  </div>
);