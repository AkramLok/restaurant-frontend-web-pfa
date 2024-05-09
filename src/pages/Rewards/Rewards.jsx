import React, { useEffect, useState } from "react";
import RestService from "../../services/restaurant.service";
import CateService from "../../services/categorie.service";
import logoNoResto from "../../assets/images/placeholder-profile.jpg";
import coverNoResto from "../../assets/images/placeholder-image.webp";
import Skeleton from "./Skeleton";

import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import GeoLocationShow from "../Menu/GeoLocationShow";
import RewardForm from "./RewardForm";
import DiscountForm from "./DiscountForm";

const Rewards = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [cateRestOwned, setCateRestOwned] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [showCategories, setShowCategories] = useState(false); // State to manage visibility of categories
  const [showRewardModal, setShowRewardModal] = useState(false); // State to manage visibility of modal
  const [showDiscountModal, setShowDiscountModal] = useState(false); // State to manage visibility of modal
  const [categorieToAddProduct, setCategorieToAddProduct] = useState(null);
  const [productToAddReward, setProductToAddReward] = useState(null);
  const [productToAddDiscount, setProductToAddDiscount] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [address, setAddress] = useState("");
  const [applyIsActivatedFilter, setApplyIsActivatedFilter] = useState(true);
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
    setShowMore(!showMore);
  };

  const toggleIsActivatedFilter = () => {
    setApplyIsActivatedFilter((prevState) => !prevState);
  };

  const toggleRewardModal = (product) => {
    setProductToAddReward(product);
    setShowRewardModal(!showRewardModal);
  };

  const toggleDiscountModal = (product) => {
    setProductToAddDiscount(product);
    setShowDiscountModal(!showDiscountModal);
  };

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    minBonusPoints: 0,
    isActivated: true,
    searchName: "",
  });

  const handleFilterChange = (filterName, value) => {
    if (filterName === "maxPrice" && value === "") {
      value = Infinity;
    }
    setFilters({ ...filters, [filterName]: value });
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
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center mt-[-60px]">
                      <div className="relative overflow-hidden rounded-full h-40 w-40">
                        {restaurantOwned ? (
                          <img
                            alt="..."
                            src={
                              "http://localhost:8080/api/restaurants/files/" +
                              restaurantOwned.logoUrl
                            }
                            className="shadow-xl h-full w-full object-cover object-center"
                          />
                        ) : (
                          <img
                            alt="..."
                            src={logoNoResto}
                            className="shadow-xl h-full w-full object-cover object-center"
                          />
                        )}
                      </div>
                    </div>

                    {restaurantOwned.id ? (
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          <button
                            className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            onClick={toggleCategories}
                            type="button"
                          >
                            {showMore ? "Show less" : "Show more"}
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
                            {restaurantOwned.id
                              ? restaurantOwned.rating
                              : "None"}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Rating
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {restaurantOwned.id
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
                      <i className="fas fa-map-marker-alt mr-2 text-sm text-blueGray-400"></i>
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
                            class="font-normal text-blue-500"
                          >
                            {showMore ? "Show less" : "Show more"}
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
                          <span className="m-6 flex items-center justify-center">
                            <p className="rounded-md bg-gray-200 px-4 py-2 mr-2">
                              Filter:
                            </p>
                            <input
                              type="number"
                              value={filters.minPrice}
                              onChange={(e) =>
                                handleFilterChange("minPrice", e.target.value)
                              }
                              placeholder="Minimum Price"
                              className="rounded-md px-4 py-2 mr-2"
                            />
                            <input
                              type="number"
                              value={filters.maxPrice}
                              onChange={(e) =>
                                handleFilterChange("maxPrice", e.target.value)
                              }
                              placeholder="Maximum Price"
                              className="rounded-md px-4 py-2 mr-2"
                            />
                            <input
                              type="number"
                              value={filters.minBonusPoints}
                              onChange={(e) =>
                                handleFilterChange(
                                  "minBonusPoints",
                                  e.target.value
                                )
                              }
                              placeholder="Minimum Bonus Points"
                              className="rounded-md px-4 py-2 mr-2"
                            />
                            <button
                              className={`rounded-md p-2 ${
                                applyIsActivatedFilter
                                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                              }`}
                              onClick={toggleIsActivatedFilter}
                            >
                              {applyIsActivatedFilter
                                ? "Activated Only"
                                : "All Products"}
                            </button>
                            <input
                              type="text"
                              value={filters.searchName}
                              onChange={(e) =>
                                handleFilterChange("searchName", e.target.value)
                              }
                              placeholder="Search by Product Name"
                              className="rounded-md px-4 py-2 ml-2"
                            />
                          </span>

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
                                  <div className="container px-5 py-8 mx-auto">
                                    <div className="flex flex-wrap -m-4">
                                      {category.products
                                        .filter((product) => {
                                          // Apply isActivated filter conditionally
                                          const isActivatedCondition =
                                            applyIsActivatedFilter
                                              ? product.isActivated ===
                                                filters.isActivated
                                              : true;

                                          // Return true only if all conditions are met, including the isActivated condition if applicable
                                          return (
                                            product.price >= filters.minPrice &&
                                            product.price <= filters.maxPrice &&
                                            product.bonusPoints >=
                                              filters.minBonusPoints &&
                                            isActivatedCondition &&
                                            product.name
                                              .toLowerCase()
                                              .includes(
                                                filters.searchName.toLowerCase()
                                              )
                                          );
                                        })
                                        .map((product) => (
                                          <div
                                            className="lg:w-1/4 md:w-1/2 p-8 w-full relative group"
                                            key={product.id}
                                          >
                                            <div className="relative overflow-hidden">
                                              <a
                                                className="block relative overflow-hidden rounded"
                                                style={{
                                                  width: "100%",
                                                  paddingBottom: "100%",
                                                  position: "relative",
                                                  borderRadius: "16px 16px 0 0",
                                                }}
                                              >
                                                <img
                                                  alt="ecommerce"
                                                  className="absolute inset-0 object-cover object-center w-full h-full block"
                                                  src={
                                                    "http://localhost:8080/api/product/files/" +
                                                    product.img
                                                  }
                                                />
                                              </a>
                                              <div
                                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                style={{
                                                  borderRadius: "16px 16px 0 0",
                                                }}
                                              >
                                                <button
                                                  onClick={() =>
                                                    toggleRewardModal(product)
                                                  }
                                                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2"
                                                >
                                                  Add reward
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    toggleDiscountModal(product)
                                                  }
                                                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                                >
                                                  Add Discount
                                                </button>
                                              </div>
                                            </div>
                                            <div
                                              className="border p-5 transition duration-300 hover:shadow-xl"
                                              style={{
                                                width: "100%",
                                                position: "relative",
                                                borderRadius: "0 0 16px 16px",
                                                overflow: "hidden",
                                              }}
                                            >
                                              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                                {category.name}
                                              </h3>
                                              <h2 className="text-gray-900 title-font text-lg font-medium">
                                                {product.name.length > 20
                                                  ? product.name.substring(
                                                      0,
                                                      20
                                                    ) + "..."
                                                  : product.name}
                                              </h2>
                                              <p className="mt-1">
                                                ${product.price}
                                              </p>
                                              <p className="mt-1 overflow-hidden overflow-ellipsis">
                                                {product.info.length > 80
                                                  ? product.info.substring(
                                                      0,
                                                      80
                                                    ) + "..."
                                                  : product.info}
                                              </p>
                                            </div>{" "}
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
      {/* Reward Modal */}
      {showRewardModal && (
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
              <RewardForm
                product={productToAddReward}
                toggleModal={toggleRewardModal}
                updateCategories={updateCategories}
              />
            </div>
          </div>
        </div>
      )}
      {/* Discount Modal */}
      {showDiscountModal && (
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
              <DiscountForm
                product={productToAddDiscount}
                toggleModalProduct={toggleDiscountModal}
                updateCategories={updateCategories}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Rewards;
