import React, { useState, useEffect } from 'react';
import AuthService from "../../services/auth.service";
import RestOwnerService from '../../services/restaurant-owner.service';

const GetAllRestaurants = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user) {
          console.log(user.email);
          const response = await RestOwnerService.getAllOwners();
          console.log(response.data);
          setOwners(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching owners:', error);
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* You can render the owners here */}
          {owners.length > 0 ? (
            owners.map(owner => (
              <div key={owner.id}>
                <p>Id: {owner.id}</p>
                <p>Name: {owner.firstName} {owner.lastName}</p>
                <p>Email: {owner.email}</p>
                {/* Add more owner details as needed */}
              </div>
            ))
          ) : (
            <p>No owners found.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default GetAllRestaurants;
