"use client";

import { useEffect, useState } from "react";

import supabase from "../../api/client";

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

const seasons = [1, 2, 3, 4, 5, 6];

const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2"];

export default function ImageGallery({ refreshTrigger }: ImageGalleryProps) {
  const [images, setImages] = useState<CricketImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [seasonNo, setSeasonNo] = useState(1);

  async function fetchImages() {
    try {
      const { data, error } = await supabase
        .from("cricket_images")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (error) throw error;

      setImages(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, [refreshTrigger]);

  function downloadImage(url: string) {
    const link = document.createElement("a");

    link.href = url;

    link.download = "PPL-memory.jpg";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  const filteredImages = images.filter((image) => image.season === seasonNo);

  if (loading) {
    return (
      <div
        className="
flex
justify-center
py-20
"
      >
        <div
          className="
bg-[#FFD93D]
border-4
border-black
px-8
py-4
font-black
shadow-[6px_6px_0_#111]
"
        >
          LOADING...
        </div>
      </div>
    );
  }

  return (
    <section
      className="
bg-[#F4EBD0]
px-6
py-16
min-h-screen
"
    >
      <div
        className="
max-w-7xl
mx-auto
"
      >
        {/* HEADER */}

        <div className="mb-14">
          <p
            className="
font-mono
font-bold
tracking-[0.3em]
"
          >
            PPL ARCHIVES
          </p>

          <h1
            className="
mt-5
text-5xl
font-black
uppercase
leading-none
"
          >
            The
            <br />
            <span
              className="
bg-black
text-white
px-3
"
            >
              Memory
            </span>
            <br />
            Wall
          </h1>

          <p
            className="
mt-6
font-bold
text-lg
"
          >
            Double tap any photo to save the memory.
          </p>
        </div>

        {/* SEASONS */}

        <div
          className="
flex
gap-3
flex-wrap
mb-12
"
        >
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setSeasonNo(season)}
              className={`
border-4
border-black

h-14
w-14

font-black

shadow-[4px_4px_0_#111]

transition-all


${
  seasonNo === season
    ? "bg-[#FF7A00] translate-x-1 translate-y-1 shadow-none"
    : "bg-white hover:-translate-y-1"
}

`}
            >
              {season}
            </button>
          ))}
        </div>

        {/* GALLERY */}

        {filteredImages.length === 0 ? (
          <div
            className="
bg-black
text-white
border-4
border-black
p-10
text-center
font-black
text-xl
"
          >
            NO MEMORIES YET 📷
          </div>
        ) : (
          <div
            className="
columns-1
sm:columns-2
lg:columns-3
gap-8
space-y-8
"
          >
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onDoubleClick={() => downloadImage(image.image_url)}
                className={`

relative

break-inside-avoid

bg-black

border-4

border-black

p-3

shadow-[8px_8px_0_#111]

cursor-pointer

transition-all

hover:-translate-y-2

${rotations[index % rotations.length]}

`}
              >
                {/* season badge */}

                <div
                  className="
absolute
top-5
left-5
z-10

bg-[#FFD93D]

border-4

border-black

px-3

py-1

font-black

text-sm
"
                >
                  S{image.season}
                </div>

                <img
                  src={image.image_url}
                  alt="PPL memory"
                  loading="lazy"
                  className="
w-full
border-2
border-white
"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
