import React from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";

const GeneralData = () => {
  // Sample data for each chart
  const chartData = {
    restaurantDistribution: {
      labels: ["Restaurant A", "Restaurant B"],
      datasets: [
        {
          label: "Restaurant Distribution",
          data: [10, 20], // Example data, replace with actual values
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    },
    waiterPerformance: {
      labels: ["Waiter A", "Waiter B"],
      datasets: [
        {
          label: "Waiter Performance",
          data: [30, 40], // Example data, replace with actual values
          backgroundColor: ["#FFCE56", "#FF6384"],
        },
      ],
    },
    productPriceTrend: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Product Price Trend",
          data: [65, 59, 80, 81, 56, 55, 40], // Example data, replace with actual values
          fill: false,
          borderColor: "#36A2EB",
        },
      ],
    },
    clientOrderFrequency: {
      labels: ["Client A", "Client B"],
      datasets: [
        {
          label: "Client Order Frequency",
          data: [10, 20], // Example data, replace with actual values
          backgroundColor: ["#FF6384", "#FFCE56"],
        },
      ],
    },
    topClientsByPoints: {
      labels: ["Client A", "Client B"],
      datasets: [
        {
          label: "Top Clients by Points",
          data: [50, 70], // Example data, replace with actual values
          backgroundColor: ["#FFCE56", "#FF6384"],
        },
      ],
    },
    orderTrend: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Order Trend",
          data: [65, 59, 80, 81, 56, 55, 40], // Example data, replace with actual values
          fill: false,
          borderColor: "#FFCE56",
        },
      ],
    },
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#000", // Set label color to black
        },
      },
    },
  };

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <section>
        <h2>Restaurants</h2>
        <table>{/* Table structure for restaurants */}</table>
        <div className="w-full flex justify-center">
          <div className="w-full md:w-96">
            <h3>Restaurant Distribution</h3>
            <Pie
              data={chartData.restaurantDistribution}
              options={chartOptions}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Waiters</h2>
        <table>{/* Table structure for waiters */}</table>
        <div className="w-full flex justify-center">
          <div className="w-full">
            <h3>Waiter Performance</h3>
            <Bar data={chartData.waiterPerformance} options={chartOptions} />
          </div>
        </div>
      </section>

      <section>
        <h2>Products</h2>
        <table>{/* Table structure for products */}</table>
        <div className="w-full flex justify-center">
          <div className="max-w-3xl w-full">
            <h3>Product Price Trend</h3>
            <Line data={chartData.productPriceTrend} options={chartOptions} />
          </div>
        </div>
      </section>

      <section>
        <h2>Clients</h2>
        <table>{/* Table structure for clients */}</table>
        <div className="w-full flex justify-center">
          <div className="w-full md:w-96">
            <h3>Client Order Frequency</h3>
            <Doughnut
              data={chartData.clientOrderFrequency}
              options={chartOptions}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>Points</h2>
        <table>{/* Table structure for points */}</table>
        <div className="w-full flex justify-center">
          <div className="max-w-3xl w-full">
            <h3>Top Clients by Points</h3>
            <Bar data={chartData.topClientsByPoints} options={chartOptions} />
          </div>
        </div>
      </section>

      <section>
        <h2>Orders</h2>
        <table>{/* Table structure for orders */}</table>
        <div className="w-full flex justify-center">
          <div className="max-w-3xl w-full">
            <h3>Order Trend</h3>
            <Line data={chartData.orderTrend} options={chartOptions} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneralData;
