import React, { useEffect, useState } from "react";
import RestService from "../../services/restaurant.service";
import CateService from "../../services/categorie.service";
import AuthService from "../../services/auth.service";
import logoNoResto from "../../assets/images/placeholder-profile.jpg";
import coverNoResto from "../../assets/images/placeholder-image.webp";
import ProductService from "../../services/product.service";
import GeoLocationShow from "../Menu/GeoLocationShow";

const Rewards = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [cateRestOwned, setCateRestOwned] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [showCategories, setShowCategories] = useState(false); // State to manage visibility of categories
  const [showModal, setShowModal] = useState(false); // State to manage visibility of modal
  const [showModalProduct, setShowModalProduct] = useState(false); // State to manage visibility of modal
  const [categorieToAddProduct, setCategorieToAddProduct] = useState(null);
  const [address, setAddress] = useState("");
  const [deleteProductByCategoryId, setDeleteProductByCategoryId] =
    useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestService.getRestaurantByOwnerId();
        const restaurantOwned = response.data;
        setRestaurantOwned(restaurantOwned);
        console.log(restaurantOwned);
        if (restaurantOwned) {
          const imageUrl =
            "http://localhost:8080/api/restaurants/files/" +
            restaurantOwned.coverImageUrl;
          setImageUrl(imageUrl);
          setBackgroundStyle({
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          });
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${restaurantOwned.location.latitude}&lon=${restaurantOwned.location.longitude}&format=json`
          );
          const data = await response.json();
          setAddress(data.display_name);

          const responseCategories =
            await CateService.getCategoriesByRestaurantId(restaurantOwned.id);
          const categoriesRestaurantOwned = responseCategories.data;
          setCateRestOwned(categoriesRestaurantOwned);
          console.log(categoriesRestaurantOwned);
        } else {
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
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching your restaurant:", error);
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  // Function to toggle visibility of categories
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  // Function to toggle visibility of modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleModalProduct = (category) => {
    setCategorieToAddProduct(category);
    setShowModalProduct(!showModalProduct);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const responseDeleteProduct =
        await ProductService.deleteProductByCategoryId(productId);
      const deletedProduct = responseDeleteProduct.data;
      setDeleteProductByCategoryId(deletedProduct);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const updateCategories = async () => {
    try {
      const responseCategories = await CateService.getCategoriesByRestaurantId(
        restaurantOwned.id
      );
      const categoriesRestaurantOwned = responseCategories.data;
      setCateRestOwned(categoriesRestaurantOwned);
    } catch (error) {
      console.error("Error fetching updated categories:", error);
    }
  };

  return (
    <main className="profile-page">
      {loading ? (
        <p className="dark:text-white text-center self-center text-2xl font-semibold whitespace-nowrap text-white">
          Loading restaurant data. Please wait...
          <Skeleton />
        </p>
      ) : (
        <div>
          <section className="relative block h-500-px">
            <div
              className="w-full h-full bg-center bg-cover"
              style={backgroundStyle}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
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
          <section className="relative py-16 bg-blueGray-200 dark:bg-gray-500">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 dark:bg-gray-300">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        {restaurantOwned ? (
                          <img
                            alt="..."
                            src={
                              "http://localhost:8080/api/restaurants/files/" +
                              restaurantOwned.logoUrl
                            }
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        ) : (
                          <img
                            alt="..."
                            src={logoNoResto}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        )}
                      </div>
                    </div>

                    {restaurantOwned.id ? (
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          <button
                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            onClick={toggleCategories}
                            type="button"
                          >
                            Show more
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {restaurantOwned.rating
                              ? restaurantOwned.rating
                              : "None"}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Rating
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {restaurantOwned.likes
                              ? restaurantOwned.likes
                              : "None"}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Likes
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {restaurantOwned.priceRange
                              ? restaurantOwned.priceRange
                              : "None"}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Price Range
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {restaurantOwned.name
                        ? restaurantOwned.name
                        : "No restaurant added !"}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {address}
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      {/*Solution Manager - Creative Tim Officer*/}
                      {restaurantOwned.cuisine
                        ? restaurantOwned.cuisine
                        : "No cuisine"}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      {/*University of Computer Science*/}
                      {restaurantOwned.phoneNumber
                        ? restaurantOwned.phoneNumber
                        : "No phone number"}
                    </div>
                    {restaurantOwned ? (
                      <GeoLocationShow
                        initialCoords={[
                          restaurantOwned.location.latitude,
                          restaurantOwned.location.longitude,
                        ]}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div class="flex flex-wrap justify-center">
                      <div class="w-full lg:w-9/12 px-4">
                        <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                          Description :{" "}
                          {restaurantOwned.description
                            ? restaurantOwned.description
                            : "None"}
                        </p>
                        <a
                          href="#pablo"
                          onClick={toggleCategories}
                          class="font-normal text-pink-500"
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Categories section */}
                  {showCategories && cateRestOwned && (
                    <div className="mt-10 py-10 border-t border-blueGray-200">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <h3 className="mb-4 text-lg font-bold">
                            Categories:
                          </h3>
                          {cateRestOwned.map((category) => (
                            <div
                              key={category.id}
                              className="mb-6 border rounded-lg p-4 bg-white shadow-md"
                            >
                              <h4 className="text-xl font-semibold mb-2">
                                {category.name}
                              </h4>
                              <ul className="list-disc ml-6">
                                <section class="text-gray-600 body-font">
                                  <div class="container px-5 py-24 mx-auto">
                                    <div class="flex flex-wrap -m-4">
                                      {category.products.map((product) => (
                                        <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                                          <a class="block relative h-48 rounded overflow-hidden">
                                            <img
                                              alt="ecommerce"
                                              class="object-cover object-center w-full h-full block"
                                              src={
                                                "http://localhost:8080/api/product/files/" +
                                                product.img
                                              }
                                            />
                                          </a>
                                          <div class="mt-4">
                                            <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                                              {category.name}
                                            </h3>
                                            <h2 class="text-gray-900 title-font text-lg font-medium">
                                              {product.name}
                                            </h2>
                                            <p class="mt-1">${product.price}</p>
                                            <p class="mt-1">{product.info}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </section>
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/*<CategorieForm restaurantId={restaurantOwned.id} toggleModal={toggleModal} updateCategories={updateCategories}/>*/}
            </div>
          </div>
        </div>
      )}

      {/* Modal Product */}
      {showModalProduct && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/*<ProductForm category={categorieToAddProduct} toggleModalProduct={toggleModalProduct} updateCategories={updateCategories}/>*/}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Rewards;
