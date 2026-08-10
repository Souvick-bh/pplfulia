"use client";
import { useEffect, useState } from "react";
import supabase from "../../api/client";
import { logVisits } from "@/api/logVisits";

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
  const [seasonNo, setSeasonNo] = useState(1);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("cricket_images")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [refreshTrigger, seasonNo]);

  const filteredImages = images.filter((img) => img.season === seasonNo);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-zinc-500 font-mono text-sm">
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl flex flex-col items-center">
      {/* Season Pill Selector */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-zinc-950 border border-zinc-900 rounded-full mb-10">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => setSeasonNo(s)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              seasonNo === s
                ? "bg-[#ea5e00] text-black font-bold shadow-md shadow-[#ea5e00]/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Season {s}
          </button>
        ))}
      </div>

      {/* Pinterest-style Masonry Column Layout */}
      {filteredImages.length === 0 ? (
        <div className="text-zinc-600 py-16 text-center font-mono">
          No photos uploaded for Season {seasonNo} yet.
        </div>
      ) : (
        <div className="w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-900 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
            >
              <img
                src={image.image_url}
                alt={image.image_name || `PPL Season ${image.season}`}
                className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Dark Overlay & Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <span className="text-xs font-mono text-[#ea5e00] mb-0.5">
                  S{image.season}
                </span>
                <p className="text-sm font-medium text-white truncate">
                  {image.image_name || "PPL Highlight"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;