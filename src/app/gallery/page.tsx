"use client";
import Link from "next/link";
import ImageGallery from "../Components/GalleryComp";

export default function Gallery() {
  const refreshTrigger = 0;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center pt-4 px-4 selection:bg-[#ea5e00]/30 selection:text-[#ea5e00]">
      {/* Upload Button */}
      {/* <div className="w-full max-w-7xl flex justify-end">
        <Link href="/uploading">
          <div className="px-5 py-2 rounded-full cursor-pointer bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 border border-zinc-800 text-sm font-medium transition-all shadow-lg hover:border-zinc-700">
            + Upload Photo
          </div>
        </Link>
      </div> */}

      <ImageGallery refreshTrigger={refreshTrigger} />
    </div>
  );
}