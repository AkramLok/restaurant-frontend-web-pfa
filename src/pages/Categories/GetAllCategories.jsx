import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import Pagination from '../../components/Pagination';
import Select from 'react-select';
import AuthService from "../../services/auth.service";
import RestOwnerService from '../../services/restaurant-owner.service';
import RestService from '../../services/restaurant.service';
import CategorieService from "../../services/categorie.service";

const GetAllCategories = () => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [ownerWithRestaurants, setOwnerWithRestaurants] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);

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

  useEffect(() => {
    const fetchCategoriesByRestaurantId = async () => {
      if (selectedRestaurantId) {
        try {
          const response = await CategorieService.getCategoriesByRestaurantId(selectedRestaurantId);
          setCategoriesData(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
    };

    fetchCategoriesByRestaurantId();
  }, [selectedRestaurantId]);

  const handleRestaurantSelect = (selectedOption) => {
    setSelectedRestaurantId(selectedOption.value);
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-1/2">
        {ownerWithRestaurants ? (
          ownerWithRestaurants.restaurants.length > 0 ? (
            <Select
              label="Select a restaurant"
              options={ownerWithRestaurants.restaurants.map(restaurant => ({
                label: restaurant.name,
                value: restaurant.id
              }))}
              onChange={handleRestaurantSelect}
            />
          ) : (
            <p>No restaurants available</p>
          )
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
        totalPages={Math.ceil(categoriesData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GetAllCategories;
