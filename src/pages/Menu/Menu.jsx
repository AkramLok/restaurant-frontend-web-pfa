import React, { useEffect, useState } from "react";
import RestService from "../../services/restaurant.service";
import CateService from "../../services/categorie.service";
import logoNoResto from "../../assets/images/placeholder-profile.jpg";
import coverNoResto from "../../assets/images/placeholder-image.webp";
import CategorieForm from "./CategorieForm";
import ProductForm from "./ProductForm";
import ProductService from "../../services/product.service";
import Skeleton from "./Skeleton";

import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const Menu = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [cateRestOwned, setCateRestOwned] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [showCategories, setShowCategories] = useState(false); // State to manage visibility of categories
  const [showModal, setShowModal] = useState(false); // State to manage visibility of modal
  const [showModalProduct, setShowModalProduct] = useState(false); // State to manage visibility of modal
  const [categorieToAddProduct, setCategorieToAddProduct] = useState(null);
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
      updateCategories();
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

  const productGallery = (category, product) => (
    <div className="relative group">
      <img
        alt="ecommerce"
        className="object-cover w-full h-full rounded-lg"
        src={"http://localhost:8080/api/product/files/" + product.img}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 text-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {category.name}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {product.name.length > 20
              ? product.name.substring(0, 20) + "..."
              : product.name}
          </h2>
          <p className="mt-1 text-gray-900">${product.price}</p>
          <p className="mt-1 overflow-hidden overflow-ellipsis text-gray-900">
            {product.info.length > 20
              ? product.info.substring(0, 20) + "..."
              : product.info}
          </p>
          <button
            onClick={() => handleDeleteProduct(product.id)}
            className="mt-2 px-3 py-1 bg-gray-200 rounded-md text-sm text-gray-800 hover:bg-gray-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const location = useLocation();
  const getBreadcrumbs = () => {
    const paths = [
      { name: "Home", url: "/" },
      { name: "Menu", url: "/menu" },
    ];
    const currentPath = location.pathname;
    return paths;
  };

  return (
    <main className="profile-page">
      <Breadcrumbs paths={getBreadcrumbs()} />
      {loading ? (
        // <p className="dark:text-white text-center self-center text-2xl font-semibold whitespace-nowrap text-white">
        //   Loading restaurant data. Please wait...
        // </p>
        <Skeleton />
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
                      Los Angeles, California
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
                        {restaurantOwned.id ? (
                          <a
                            href="#pablo"
                            onClick={toggleCategories}
                            class="font-normal text-pink-500"
                          >
                            Show more
                          </a>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Categories section */}
                  {showCategories && cateRestOwned && (
                    <div className="mt-10 py-10 border-t border-blueGray-200">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-11/12 px-4">
                          <h3 className="mb-4 text-lg font-bold">
                            Categories:
                          </h3>
                          <button
                            onClick={toggleModal}
                            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Add New Category
                          </button>
                          {cateRestOwned.map((category) => (
                            <div
                              key={category.id}
                              className="mb-6 border rounded-lg p-4 bg-white shadow-md"
                            >
                              <h4 className="text-xl font-semibold">
                                {category.name}
                              </h4>

                              <ul className="list-disc ml-6">
                                <section className="text-gray-600 body-font">
                                  <div className="container px-4 py-10 mx-auto">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                      {category.products
                                        .reduce((chunks, product, index) => {
                                          const chunkIndex = Math.floor(
                                            index / 4
                                          );
                                          if (!chunks[chunkIndex]) {
                                            chunks[chunkIndex] = [];
                                          }
                                          chunks[chunkIndex].push(product);
                                          return chunks;
                                        }, [])
                                        .map((chunk, chunkIndex) => (
                                          <div key={chunkIndex}>
                                            {chunk.map((product, index) => (
                                              <div
                                                className="relative mb-6"
                                                key={index}
                                              >
                                                {productGallery(
                                                  category,
                                                  product
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                </section>
                              </ul>

                              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="grid gap-4">
                                  <img
                                    class="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                                    alt=""
                                  />
                                  <img
                                    class="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                                    alt=""
                                  />
                                  <img
                                    class="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                                    alt=""
                                  />
                                </div>

                                <div class="grid gap-4">
                                  <div>
                                    <img
                                      class="h-auto max-w-full rounded-lg"
                                      src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <img
                                      class="h-auto max-w-full rounded-lg"
                                      src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <img
                                      class="h-auto max-w-full rounded-lg"
                                      src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="grid gap-4">
                                  <div>
                                    <img
                                      class="h-auto max-w-full rounded-lg"
                                      src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <img
                                      class="h-auto max-w-full rounded-lg"
                                      src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <img
                                      class="h-auto max-w-full rounded-lg"
                                      src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => toggleModalProduct(category)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                              >
                                Add New Product in {category.name}
                              </button>
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
              <CategorieForm
                restaurantId={restaurantOwned.id}
                toggleModal={toggleModal}
                updateCategories={updateCategories}
              />
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
              <ProductForm
                category={categorieToAddProduct}
                toggleModalProduct={toggleModalProduct}
                updateCategories={updateCategories}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Menu;
