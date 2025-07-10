import History from "../Components/History"


export default function HomeContent() {

    

    return(
        <div className="flex flex-col ">
          <div className="flex flex-col items-center justify-center">
            <div>
                <video src="/videos/ppl.mp4" autoPlay muted loop
                preload="auto" playsInline
                className="  " />
            </div>
            <div className="flex flex-col justify-center pl-8 pr-8 ">
                <div className="text-[#ffffff] text-2xl">Wanna watch how a bunch of friends started thier own cricket league 
                to keep the nostalgic memories alive</div>
            </div>
          </div>
            <div className="justify-start items-start">
                <History />
            </div>
            
        </div>
    )
}