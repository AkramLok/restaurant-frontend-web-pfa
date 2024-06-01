import React, { useEffect, useState } from "react";
import RestService from "../../services/restaurant.service";
import ClientParticipationService from "../../services/dashboard.service";

const ClientsData = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [clientsParticipation, setClientsParticipation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestService.getRestaurantByOwnerId();
        const restaurantOwned = response.data;
        setRestaurantOwned(restaurantOwned);

        const responseClientsParticipation =
          await ClientParticipationService.getParticipationsByRestaurantId(
            restaurantOwned.id
          );
        const clientsParticipation = responseClientsParticipation.data;
        setClientsParticipation(clientsParticipation);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching your restaurant:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {restaurantOwned && (
        <div>
          <h2>Restaurant Owned</h2>
          <p>Name: {restaurantOwned.name}</p>
          <p>CIN: {restaurantOwned.cin}</p>
          <p>Phone: {restaurantOwned.phone}</p>
          <p>Email: {restaurantOwned.email}</p>
        </div>
      )}
      {clientsParticipation.length > 0 && (
        <div>
          <h2>Clients Participation</h2>
          <ul>
            {clientsParticipation.map((participation, index) => (
              <li key={index}>
                <p>Client ID: {participation.clientId}</p>
                <p>Restaurant ID: {participation.restaurantId}</p>
                <p>Points: {participation.points}</p>
                {/* You can fetch client details here and display alongside participation */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientsData;
