import React, { useState, useEffect } from 'react';
import AuthService from "../../services/auth.service";
import RestOwnerService from '../../services/restaurant-owner.service';
import RestService from '../../services/restaurant.service';
import RestaurantCard from './RestaurantCard';
import Pagination from '../../components/Pagination';
import { createClient } from 'pexels';

const client = createClient('vLUNOhIiYXDqPhLt3G7kuw7X5OdFbZfQlz3KpU47HwfCSGiE7Hn5xhP9');
const query = 'Nature';

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
    // Fetch photos for each restaurant
    const fetchRestaurantPhotos = async () => {
      try {
        if (ownerWithRestaurants && ownerWithRestaurants.restaurants.length > 0) {
          // Create an array to store promises for fetching photos
          console.log(ownerWithRestaurants.restaurants);
          const photoPromises = ownerWithRestaurants.restaurants.map(async (restaurant) => {
            const photos = await client.photos.search({ query: restaurant.name, per_page: 1 });
            return photos.photos[0]?.src.original || '';
          });

          // Resolve all promises
          const photos = await Promise.all(photoPromises);
          setRestaurantPhotos(photos);
          console.log(restaurantPhotos);
        }
      } catch (error) {
        console.error('Error fetching restaurant photos:', error);
      }
    };

    fetchRestaurantPhotos();
  }, [ownerWithRestaurants]);

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
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} imageUrl={restaurantPhotos[index]} />
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
