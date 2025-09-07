"use client"
import { useEffect, useState } from "react"
import Footer from "./Footer";
import  supabase  from "../../api/client"

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
      <div className="flex justify-center items-center ml-5 mr-5 mb-12">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full items-center justify-center">
            {getFilteredImages().map((image) => image.season == seasonNo ? (
            <div key={image.id} tabIndex={0} className="w-62 h-62 bg-[#4f4f4f] rounded-xl flex justify-center items-center border-2 border-[#252525] focus:-translate-x-2 focus:-translate-y-2 transition-all duration-300 shadow-[6px_6px_2px_0px_rgba(255,255,255,0.9)]">
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
      <Footer />
    </div >
  );
};

export default ImageGallery;