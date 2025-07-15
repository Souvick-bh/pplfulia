import { VT323 } from "next/font/google"
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
})



export default function Members() {

    return(
        <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col items-center justify-center`}>
            <h1 className="text-4xl">Very Soon...</h1>
            <h1 className="text-2xl">Cause, we believe in fast shipments</h1>
        </div>
    )
}