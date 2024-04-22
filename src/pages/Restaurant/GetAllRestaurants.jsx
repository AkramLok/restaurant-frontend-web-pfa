import React, { useState, useEffect } from 'react';
import AuthService from "../../services/auth.service";

const GetAllRestaurants = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      console.log(user.email);
      AuthService.getAll().then(response => {
        setOwners(response.data); // Assuming the response data is an array of owners
        setLoading(false);
      }).catch(error => {
        console.error('Error fetching owners:', error);
        setLoading(false);
      });
    }
  }, []);



  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {AuthService.compareOwner(owners, currentUser.email) ? (
            <p>User is an owner</p>
          ) : (
            <p>User is not an owner {owners}</p>
          )}
        </div>
      )}
    </>
  );
};

export default GetAllRestaurants;
