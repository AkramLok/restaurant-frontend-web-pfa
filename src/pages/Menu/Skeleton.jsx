import React, { useEffect, useState } from "react";
import logoNoResto from "../../assets/images/placeholder-profile.jpg";
import coverNoResto from "../../assets/images/placeholder-image.webp";

const Skeleton = () => {
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(coverNoResto);
    setBackgroundStyle({
      backgroundImage: `url(${coverNoResto})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
    });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      {/* Background section */}
      <section className="relative block h-500-px">
        {/* Background image */}
        <div
          className="w-full h-full bg-center bg-cover"
          style={backgroundStyle}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        {/* Background overlay */}
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>

      {/* Content section */}
      <section className="relative py-16 bg-blueGray-200 dark:bg-gray-500">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 dark:bg-gray-300">
            <div className="px-6">
              {/* Restaurant logo */}
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    {/* Restaurant logo image */}
                    <img
                      alt="..."
                      src={logoNoResto}
                      className="shadow-xl animate-pulse rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                {/* Restaurant info */}
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  {/* Restaurant ratings */}
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    {/* Ratings */}
                    <div className="mr-4 p-3 text-center">
                      <span className="animate-pulse text-sm text-blueGray-400">
                        Rating
                      </span>
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        <p className="animate-pulse w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                      </span>
                    </div>
                    {/* Likes */}
                    <div className="mr-4 p-3 text-center">
                      <span className="animate-pulse text-sm text-blueGray-400">
                        Likes
                      </span>
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        <p className="animate-pulse w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                      </span>
                    </div>
                    {/* Price Range */}
                    <div className="mr-4 p-3 text-center">
                      <span className="animate-pulse text-sm text-blueGray-400">
                        Price Range
                      </span>
                      <span className="text-sm text-blueGray-400">
                        <p className="animate-pulse w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Restaurant details */}
              <div className="text-center mt-12">
                <div className="flex items-center justify-center mb-2">
                  <i className="animate-pulse fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  <p className="animate-pulse w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <i className="animate-pulse fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  <p className="animate-pulse w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <i className="animate-pulse fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  <p className="animate-pulse w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
              </div>

              {/* Restaurant description */}
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      <p className="animate-pulse w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </p>
                    <a href="#pablo" className="font-normal text-pink-500">
                      <p className="animate-pulse w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skeleton;
