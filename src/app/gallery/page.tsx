"use client";

import ImageGallery from "../Components/GalleryComp";


export default function Gallery() {

  const refreshTrigger = 0;


  return (

    <main
      className="
      min-h-screen
      bg-[#FFF8DC]
      text-[#111111]
      overflow-hidden
      "
    >


      {/* Top Archive Banner */}

      <section
        className="
        px-6
        pt-10
        "
      >

        <div
          className="
          mx-auto
          max-w-7xl
          "
        >


          <div
            className="
            inline-block
            border-4
            border-black
            bg-[#FFD93D]
            px-5
            py-2
            font-black
            uppercase
            shadow-[5px_5px_0_#111]
            -rotate-2
            "
          >

            PPL Season Archives

          </div>



          <h1
            className="
            mt-8
            text-5xl
            sm:text-7xl
            font-black
            uppercase
            leading-[0.85]
            "
          >

            Every Match.

            <br />

            Every

            <span
              className="
              bg-black
              text-[#FFF8DC]
              px-3
              ml-2
              "
            >
              Memory.
            </span>


          </h1>



          <p
            className="
            mt-6
            max-w-xl
            text-lg
            font-bold
            "
          >

            A collection of legendary moments,
            chaotic matches and memories from
            Panchayet Premiere League.

          </p>


        </div>


      </section>





      {/* Gallery */}


      <section
        className="
        mt-10
        "
      >

        <ImageGallery
          refreshTrigger={refreshTrigger}
        />

      </section>



    </main>

  );

}