import React, { useEffect, useState } from "react";
import RestService from "../../services/restaurant.service";
import OrderService from "../../services/dashboard.service";
import DashboardCard from "./DashboardCard";
import Chart from "chart.js/auto";

const OrdersData = () => {
  const [restaurantOwned, setRestaurantOwned] = useState(null);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState(null);

  const calculateStats = (orders) => {
    if (!orders || orders.length === 0) {
      return {
        maxPrice: 0,
        minPrice: 0,
        avgPrice: 0,
      };
    }

    let total = 0;
    let max = orders[0].totalPrice;
    let min = orders[0].totalPrice;

    orders.forEach((order) => {
      total += order.totalPrice;
      if (order.totalPrice > max) max = order.totalPrice;
      if (order.totalPrice < min) min = order.totalPrice;
    });

    const avg = total / orders.length;

    return {
      maxPrice: max,
      minPrice: min,
      avgPrice: avg,
    };
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestService.getRestaurantByOwnerId();
        const restaurantOwned = response.data;
        setRestaurantOwned(restaurantOwned);

        const responseOrders = await OrderService.getOrdersByRestaurantId(
          restaurantOwned.id
        );
        const ordersRestaurantOwned = responseOrders.data;
        setOrders(ordersRestaurantOwned);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching your restaurant:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (!orders) return;

    const ctx = document.getElementById("orderChart");
    const orderLabels = orders.map((order, index) => `Order ${index + 1}`);
    const orderPrices = orders.map((order) => order.totalPrice);

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: orderLabels,
        datasets: [
          {
            label: "Total Price",
            data: orderPrices,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChart(newChart);

    return () => {
      if (chart) chart.destroy();
    };
  }, [orders]);

  const stats = calculateStats(orders);

  return (
    <div>
      {orders === null ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Orders for {restaurantOwned && restaurantOwned.name}</h2>
          <DashboardCard
            title="Nombre des ordres fait au restaurant"
            content={`Total: ${orders && orders.length}`}
          />
          {orders &&
            orders.map((order) => (
              <div key={order.id}>
                <p>Order ID: {order.id}</p>
                {/* Add more details about each order as needed */}
              </div>
            ))}
          <h2>Order Statistics</h2>
          <p>Maximum Total Price: {stats.maxPrice}</p>
          <p>Minimum Total Price: {stats.minPrice}</p>
          <p>Average Total Price: {stats.avgPrice}</p>
          <canvas id="orderChart" width="600" height="400"></canvas>
        </div>
      )}
    </div>
  );
};

export default OrdersData;
