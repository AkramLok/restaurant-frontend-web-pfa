import React, { useEffect, useState } from "react";
import logoNoResto from "../../assets/images/placeholder-profile.jpg";
//import coverNoResto from "../../assets/images/placeholder-image.webp";
import coverNoResto from "../../assets/images/coverNoResto.jpg";

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
    <section class="relative block py-16 bg-blueGray-200 dark:bg-gray-500">
      <div class="container mx-auto px-4">
        <div class="bg-white w-full mb-6 shadow-xl rounded-lg dark:bg-gray-300 rounded overflow-hidden shadow-lg mx-auto my-4">
          <div class="px-6 py-4">
            <div class="bg-gray-300 h-8 w-3/4 mb-2 animate-pulse"></div>
            <div class="bg-gray-300 h-4 w-1/2 mb-2 animate-pulse"></div>
            <div class="bg-gray-300 h-4 w-1/3 mb-2 animate-pulse"></div>
            <div class="bg-gray-300 h-4 w-1/4 mb-2 animate-pulse"></div>
            <div class="bg-gray-300 h-4 w-2/3 mb-2 animate-pulse"></div>
          </div>
          <div class="px-6 pt-4 pb-2">
            <div class="flex justify-between text-center">
              <div class="p-3">
                <div class="bg-gray-300 h-8 w-12 mb-1 animate-pulse"></div>
                <div class="bg-gray-300 h-4 w-16 animate-pulse"></div>
              </div>
              <div class="p-3">
                <div class="bg-gray-300 h-8 w-12 mb-1 animate-pulse"></div>
                <div class="bg-gray-300 h-4 w-16 animate-pulse"></div>
              </div>
              <div class="p-3">
                <div class="bg-gray-300 h-8 w-12 mb-1 animate-pulse"></div>
                <div class="bg-gray-300 h-4 w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg dark:bg-gray-300">
          <div class="py-10 border-t border-blueGray-200">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-11/12 px-4">
                <div class="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                <div class="bg-gray-300 h-10 w-1/3 mb-4 animate-pulse"></div>
                <div class="m-6 flex items-center justify-center">
                  <div class="bg-gray-300 h-8 w-24 rounded-md px-4 py-2 mr-2 animate-pulse"></div>
                  <div class="bg-gray-300 h-8 w-32 rounded-md px-4 py-2 mr-2 animate-pulse"></div>
                  <div class="bg-gray-300 h-8 w-32 rounded-md px-4 py-2 mr-2 animate-pulse"></div>
                  <div class="bg-gray-300 h-8 w-40 rounded-md px-4 py-2 mr-2 animate-pulse"></div>
                  <div class="bg-gray-300 h-8 w-48 rounded-md px-4 py-2 ml-2 animate-pulse"></div>
                </div>
                <div class="mb-6 border rounded-lg p-4 bg-white shadow-md">
                  <div class="bg-gray-300 h-8 w-1/4 mb-2 animate-pulse"></div>
                  <ul class="list-disc ml-6">
                    <section class="text-gray-600 body-font">
                      <div class="container px-5 py-8 mx-auto">
                        <div class="flex flex-wrap -m-4">
                          <div class="lg:w-1/4 md:w-1/2 p-8 w-full relative group">
                            <div class="relative overflow-hidden bg-gray-300 h-64 w-full mb-4 animate-pulse"></div>
                            <div class="border p-5 transition duration-300 hover:shadow-xl w-full h-36 animate-pulse">
                              <div class="bg-gray-300 h-4 w-1/4 mb-2 animate-pulse"></div>
                              <div class="bg-gray-300 h-6 w-1/2 mb-2 animate-pulse"></div>
                              <div class="bg-gray-300 h-4 w-1/4 mb-2 animate-pulse"></div>
                              <div class="bg-gray-300 h-4 w-3/4 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </ul>
                  <div class="bg-gray-300 h-10 w-1/3 mt-4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skeleton;
