import React from "react";
import { Bar } from "react-chartjs-2";

const ProductsData = () => {
  // Sample product data
  const products = [
    { name: "Product A", price: 10, bonusPoints: 5 },
    { name: "Product B", price: 15, bonusPoints: 7 },
    { name: "Product C", price: 20, bonusPoints: 10 },
    // Add more products as needed
  ];

  // Extracting labels and data for the chart
  const productNames = products.map((product) => product.name);
  const productPrices = products.map((product) => product.price);
  const productBonusPoints = products.map((product) => product.bonusPoints);

  // Chart data
  const data = {
    labels: productNames,
    datasets: [
      {
        label: "Price",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.7)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: productPrices,
      },
      {
        label: "Bonus Points",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.7)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: productBonusPoints,
      },
    ],
  };

  return (
    <div>
      <h2>Products Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default ProductsData;
