import History from "../Components/History"


export default function HomeContent() {

    

    return(
        <div className="flex flex-col ">
          <div className="flex flex-col lg:w-screen items-center justify-center">
            <div className="mt-24 mb-2 ml-6 sm:mt-0 sm:mb-0">
                <video src="/videos/ppl.mp4" autoPlay muted loop
                preload="auto" playsInline
                className="  " />
            </div>
            <div className="flex flex-col lg:w-screen justify-center text-center pt-6 pl-8 pr-6 md:pt-0">
                <div className="text-[#ffffff] text-2xl md:text-4xl">Wanna watch how a bunch of friends started thier own cricket league 
                to keep the nostalgic memories alive</div>
            </div>
          </div>
            <div className="justify-start items-start pt-4">
                <History />
            </div>
            
        </div>
    )
}