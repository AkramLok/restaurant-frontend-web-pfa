import React, { useEffect, useState } from "react";
import RestService from "../../services/restaurant.service";
import FeedbackService from "../../services/dashboard.service";
import DashboardCard from "./DashboardCard";
import Chart from "chart.js/auto";

const FeedbacksData = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [feedbacks, setFeedbacks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestService.getRestaurantByOwnerId();
        const restaurantOwned = response.data;
        setRestaurantOwned(restaurantOwned);

        const responseFeedbacks =
          await FeedbackService.getFeedbacksByRestaurantId(restaurantOwned.id);
        const feedbacks = responseFeedbacks.data;
        setFeedbacks(feedbacks);

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
      <h2 className="text-lg font-bold mb-4">
        {restaurantOwned && restaurantOwned.name} Feedbacks
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 dark:text-white">
                <th className="py-3 px-6 border">Feedback ID</th>
                <th className="py-3 px-6 border">Description</th>
                <th className="py-3 px-6 border">Rating</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks &&
                feedbacks.map((feedback) => (
                  <tr
                    key={feedback.id}
                    className="hover:bg-gray-100 dark:bg-gray-800 dark:text-white bg-white bg-opacity-25 "
                  >
                    <td className="py-3 px-6 border">{feedback.id}</td>
                    <td className="py-3 px-6 border">{feedback.description}</td>
                    <td className="py-3 px-6 border">{feedback.rating}</td>
                  </tr>
                ))}
              {!feedbacks ||
                (feedbacks && feedbacks.length === 0 && (
                  <tr className="hover:bg-gray-100">
                    <td colSpan="3" className="py-3 px-6 border text-center">
                      No feedback added yet!
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbacksData;
