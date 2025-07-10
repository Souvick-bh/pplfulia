import Header from "./Components/Header";
import { VT323 } from "next/font/google"
import HomeContent from "./Pages/HomeContent";


const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
})

export default function Home() {

 

  return (
    <div className={`${vt323.className} bg-[#000000] min-h-screen`}>
     <Header />
     <HomeContent />
    </div>
  );
}
