"use client"
import { useEffect, useState, useRef } from "react"
// import {
//   DraggableCardBody,
//   DraggableCardContainer,
// } from "@/components/ui/draggable-card";

import  supabase  from "../../api/client"
// import { div } from "framer-motion/client";

interface CricketImage {
  id: string;
  season: number;
  image_url: string;
  image_name: string;
  uploaded_at: string;
}

interface ImageGalleryProps {
  refreshTrigger?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ refreshTrigger }) => {
  const [images, setImages] = useState<CricketImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [seasonNo,setSeasonNo] = useState(1);
    const divRef = useRef<HTMLDivElement | null>(null);
  const selectedSeason = 'all';

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('cricket_images')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [refreshTrigger,seasonNo]);

  // const deleteImage = async (image: CricketImage) => {
  //   try {
  //     // Extract filename from URL
  //     const urlParts = image.image_url.split('/');
  //     const fileName = urlParts[urlParts.length - 1];

  //     // Delete from storage
  //     const { error: storageError } = await supabase.storage
  //       .from('gallery')
  //       .remove([fileName]);

  //     if (storageError) throw storageError;

  //     // Delete from database
  //     // const { error: dbError } = await supabase
  //     //   .from('cricket_images')
  //     //   .delete()
  //     //   .eq('id', image.id);

  //     // if (dbError) throw dbError;

  //     fetchImages();
  //   } catch (error) {
  //     console.error('Delete error:', error);
      
  //   }
  // };

  const getFilteredImages = () => {
    if (selectedSeason === 'all') return images;
    return images.filter(img => img.season === parseInt(selectedSeason));
  };


  // const getImageCountBySeason = (season: number) => {
  //   return images.filter(img => img.season === season).length;
  // };


  // <DraggableCardContainer className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-screen justify-center overflow-clip">
  //           <p className="absolute top-1/2 mx-auto max-w-sm text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
  //             If its your first day at Fight Club, you have to fight.
  //           </p>
  //           {getFilteredImages().map((image) => image.season == seasonNo ? (
  //           <DraggableCardBody key={image.id} className="max-w-60 max-h-60 bg-transparent">
  //           <img
  //               src={image.image_url}
  //               alt={image.image_name}
  //               className="w-full h-auto pointer-events-none relative z-10 object-cover rounded-2xl border-4 border-[#ffffff]"
  //               />
  //           </DraggableCardBody>
  //            ):(null))}
  //         </DraggableCardContainer>

  function handleClick() {
    divRef.current?.focus();
  }

  if (loading) {
    return <div className="text-center p-8">Loading images...</div>;
  }

  return (
    <div  className="w-full h-auto flex bg-[#000000] items-center flex-col">
      <div className={`flex flex-row pt-1 pb-1 pr-4 pl-4 justify-center space-x-4 text-[#ffffff] border-2 border-[#252525] w-50 rounded-lg mt-5 mb-10`}>
        <button onClick={()=>setSeasonNo(1)} className={seasonNo==1?`bg-[#333333] pr-2 pl-2 rounded-md`:`bg-[#000000]`}>S1</button>
        <button onClick={()=>setSeasonNo(2)} className={seasonNo==2?`bg-[#333333] pr-2 pl-2 rounded-md`:`bg-[#000000]`}>S2</button>
        <button onClick={()=>setSeasonNo(3)} className={seasonNo==3?`bg-[#333333] pr-2 pl-2 rounded-md`:`bg-[#000000]`}>S3</button>
        <button onClick={()=>setSeasonNo(4)} className={seasonNo==4?`bg-[#333333] pr-2 pl-2 rounded-md`:`bg-[#000000]`}>S4</button>
        <button onClick={()=>setSeasonNo(5)} className={seasonNo==5?`bg-[#333333] pr-2 pl-2 rounded-md`:`bg-[#000000]`}>S5</button>
      </div>
      <div className="flex justify-center items-center ml-5 mr-5">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full items-center justify-center">
            {getFilteredImages().map((image) => image.season == seasonNo ? (
            <div key={image.id} ref={divRef} tabIndex={0} onClick={handleClick} className="w-62 h-62 bg-[#4f4f4f] rounded-xl flex justify-center items-center border-2 border-[#252525] focus:-translate-x-2 focus:-translate-y-2 transition-all duration-300 shadow-[6px_6px_2px_0px_rgba(255,255,255,0.9)]">
            <img
                src={image.image_url}
                alt={image.image_name}
                className="max-w-60 max-h-60 rounded-2xl border-3 border-[#252525]"
                />
            </div>
             ):(null))}
          </div>
        </div>
      </div>

    </div >
  );
};

export default ImageGallery;