import React, { useState, useEffect } from 'react';
import AuthService from "../../services/auth.service";
import RestOwnerService from '../../services/restaurant-owner.service';
import RestService from '../../services/restaurant.service';
import RestaurantCard from './RestaurantCard';
import Pagination from '../../components/Pagination';


const GetAllRestaurants = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [ownerWithRestaurants, setOwnerWithRestaurants] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restaurantPhotos, setRestaurantPhotos] = useState([]);

  useEffect(() => {
    const fetchOwnerWithRestaurants = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user) {
          const response = await RestOwnerService.getAllOwners();
          const allOwners = response.data;
          const filteredOwner = allOwners.find(owner => owner.email === user.email);
          if (filteredOwner) {
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


  const totalPages = Math.ceil((ownerWithRestaurants?.restaurants.length || 0) / itemsPerPage);

  const getCurrentRestaurants = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(startIndex+" :: "+endIndex);
    return ownerWithRestaurants?.restaurants.slice(startIndex, endIndex) || [];
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {ownerWithRestaurants ? (
            <div>
              <div>
                <p>Owner ID: {ownerWithRestaurants.owner.id}</p>
                <p>Name: {ownerWithRestaurants.owner.firstName} {ownerWithRestaurants.owner.lastName}</p>
                <p>Email: {ownerWithRestaurants.owner.email}</p>
              </div>
              <p>Restaurants: You have {ownerWithRestaurants.restaurants.length} !</p>
              <div className="category-container flex flex-wrap justify-center m-4">
                {getCurrentRestaurants().map((restaurant, index) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <p>No owner found.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default GetAllRestaurants;
