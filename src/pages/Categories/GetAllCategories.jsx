import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton';
import CategoryCard from './CategoryCard';
import Pagination from '../../components/Pagination';
import Select from '../../components/Select';
import AuthService from "../../services/auth.service";
import RestOwnerService from '../../services/restaurant-owner.service';
import RestService from '../../services/restaurant.service';


// const restaurants = [
//   { label: 'Choose a restaurant', value: '' },
//   { label: 'United States', value: 'US' },
//   { label: 'Canada', value: 'CA' },
//   { label: 'France', value: 'FR' },
//   { label: 'Germany', value: 'DE' }
// ];

const categoriesData = [
    { id: 1, name: 'Category 1', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 2, name: 'Category 2', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 3, name: 'Category 3', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 4, name: 'Category 4', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 5, name: 'Category 5', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 6, name: 'Category 6', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 7, name: 'Category 7', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 8, name: 'Category 8', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 9, name: 'Category 9', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 10, name: 'Category 10', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 11, name: 'Category 11', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 12, name: 'Category 12', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 13, name: 'Category 13', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 14, name: 'Category 14', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 15, name: 'Category 15', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 16, name: 'Category 16', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 17, name: 'Category 17', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 18, name: 'Category 18', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 19, name: 'Category 19', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 20, name: 'Category 20', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 21, name: 'Category 21', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 22, name: 'Category 22', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 23, name: 'Category 23', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 24, name: 'Category 24', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 25, name: 'Category 25', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 26, name: 'Category 26', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 27, name: 'Category 27', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 28, name: 'Category 28', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 29, name: 'Category 29', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 30, name: 'Category 30', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 31, name: 'Category 31', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 32, name: 'Category 32', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 33, name: 'Category 33', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 34, name: 'Category 34', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 35, name: 'Category 35', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 36, name: 'Category 36', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 37, name: 'Category 37', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 38, name: 'Category 38', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 39, name: 'Category 39', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 40, name: 'Category 40', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 41, name: 'Category 41', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 42, name: 'Category 42', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 43, name: 'Category 43', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 44, name: 'Category 44', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 45, name: 'Category 45', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 46, name: 'Category 46', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 47, name: 'Category 47', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 48, name: 'Category 48', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 49, name: 'Category 49', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    { id: 50, name: 'Category 50', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam eveniet quod asperiores corrupti in fugiat molestias dolores doloribus ducimus, modi, cum earum omnis est alias quos dolorem! Pariatur, ipsum." },
    
  ];



  
const GetAllCategories = () => {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(categoriesData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [ownerWithRestaurants, setOwnerWithRestaurants] = useState(null);
  const [loading, setLoading] = useState(true);


  const getCurrentCategories = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categoriesData.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchOwnerWithRestaurants = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user) {
          // Fetch all owners
          const response = await RestOwnerService.getAllOwners();
          const allOwners = response.data;

          // Filter the owner with the same email as in localStorage
          const filteredOwner = allOwners.find(owner => owner.email === user.email);

          if (filteredOwner) {
            // Fetch restaurants of the filtered owner
            const restaurantsResponse = await RestService.getRestaurantsByOwner(filteredOwner.id);
            const ownerWithRestaurantsData = {
              owner: filteredOwner,
              restaurants: restaurantsResponse.data
            };
            setOwnerWithRestaurants(ownerWithRestaurantsData);
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching owner with restaurants:', error);
        setLoading(false);
      }
    };

    fetchOwnerWithRestaurants();
  }, []);
  
  return (
<div className="flex flex-col items-center justify-center h-full">
<div className="w-1/2">
  {ownerWithRestaurants ? (
    <Select
      label="Select a restaurant"
      options={ownerWithRestaurants.restaurants.map(restaurant => ({
        label: restaurant.name,
        value: restaurant.id
      }))}
    />
  ) : (
    <p>Loading...</p>
  )}
</div>
  <div className="category-container flex flex-wrap justify-center m-4">
    {getCurrentCategories().map(category => (
      <CategoryCard key={category.id} category={category} />
    ))}
  </div>
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
</div>

  );
};

export default GetAllCategories;
