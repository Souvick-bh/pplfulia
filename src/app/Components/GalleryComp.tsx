"use client"
import { useEffect, useState } from "react"
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
  }, [refreshTrigger]);

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

  if (loading) {
    return <div className="text-center p-8">Loading images...</div>;
  }

          // <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          //                     <div className="text-center text-white space-y-2">
          //                       <p className="text-sm font-medium">Season {image.season}</p>
                              
          //                     </div>
          //                   </div>

  return (
    <div className="w-full">
        <div className="text-center mt-8 text-3xl font-medium text-[#ea5e00]">Gallery</div>
      <div>
        <div>
          

          <div className="mt-6">
            {getFilteredImages().length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                No images found for this selection
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getFilteredImages().map((image) => (
                  <div key={image.id} className="">
                    <div className=" mt-8 mb-8 ml-8 mr-8  overflow-hidden rounded-lg  bg-transparent">
                      <img
                        src={image.image_url}
                        alt={image.image_name}
                        className="max-w-40 max-h-30 object-cover rounded-2xl transition-transform hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;