import React, { useEffect, useState } from "react";
import RestService from '../../services/restaurant.service';
import AuthService from "../../services/auth.service";

const GetAllRewards = () => {

    const [restaurantOwned, setRestaurantOwned] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await RestService.getRestaurantByOwnerId();
                const restaurantOwned = response.data;
                setRestaurantOwned(restaurantOwned);
                console.log(restaurantOwned);
                setLoading(false);
            } catch (error) {
              console.error('Error fetching your restaurant:', error);
              setLoading(false);
            }
          };
        fetchRestaurants();
      }, []);



    return(
        <main class="profile-page">
             {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
            {restaurantOwned.name}
        </p>
      )}
        </main>
    )
}

export default GetAllRewards;