import React, { useEffect, useState } from "react";
import RestService from "../../services/restaurant.service";
import WaiterService from "../../services/dashboard.service";

const WaitersData = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [waiters, setWaiters] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestService.getRestaurantByOwnerId();
        const restaurantOwned = response.data;
        setRestaurantOwned(restaurantOwned);

        const responseWaiters = await WaiterService.getWaitersByRestaurantId(
          restaurantOwned.id
        );
        const waiters = responseWaiters.data;
        setWaiters(waiters);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching your restaurant:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {restaurantOwned && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Restaurant Owned</h2>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {restaurantOwned.name}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {restaurantOwned.description}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {restaurantOwned.phone}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {restaurantOwned.email}
            </p>
          </div>
        </div>
      )}
      {waiters && (
        <div>
          <h2 className="text-lg font-bold mb-4">Waiters</h2>
          <div className="overflow-auto">
            <table className="min-w-full shadow-md rounded-lg overflow-hidden">
              <thead className="bg-white dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {waiters.map((waiter) => (
                  <tr key={waiter.id} className="hover:bg-gray-800 border">
                    <td className="px-4 py-2">{waiter.name}</td>
                    <td className="px-4 py-2">{waiter.phone}</td>
                    <td className="px-4 py-2">{waiter.email}</td>
                  </tr>
                ))}
                {!waiters ||
                  (waiters && waiters.length === 0 && (
                    <tr className="hover:bg-gray-100 border">
                      <td colSpan="3" className="px-4 py-2 text-center">
                        No waiters available
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitersData;
