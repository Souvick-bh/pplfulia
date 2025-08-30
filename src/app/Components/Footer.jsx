import { IoLogoYoutube } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoFacebook } from "react-icons/io";

export default function Footer() {

    return(
        <div className="flex flex-col justify-center items-center mb-25">
            <div className="w-screen bg-[#495057] h-[1px] mb-8">.</div>
            <div className="flex flex-col pt-2 pb-4 pl-8 pr-8 border-1 border-[#35393c] rounded-2xl shadow-[3px_3px_5px_0px_rgba(255,255,255)] ">
                <h2 className="text-[#ffffff] mb-2 text-2xl md:text-3xl text-center">Our Socials</h2>
                <div className="flex flex-row gap-5 text-2xl md:text-3xl bg-gray-500/20 pt-2 pb-2 pl-6 pr-6 rounded-xl shadow-[2px_2px_1px_0px_rgba(255,255,255)]">
                    <a href="https://youtube.com/@pplfulia?si=NnMmQRHxSrm-vqpo" className="text-[#495057] hover:text-[#000000] active:text-[#000000] cursor-pointer"><IoLogoYoutube /></a>
                    <a href="https://www.instagram.com/pplfulia/profilecard/?igsh=MXNuaHNzaDlyaXB1dg==" className="text-[#495057] hover:text-[#000000] active:text-[#000000] cursor-pointer"><IoLogoInstagram /></a>
                    <a href="https://www.facebook.com/profile.php?id=61566263444046&mibextid=ZbWKwL" className="text-[#495057] hover:text-[#000000] active:text-[#000000] cursor-pointer"><IoLogoFacebook /></a>
                </div>
                
            </div>
        </div>
    )
}