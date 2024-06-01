import React from "react";
import c1 from "../assets/images/cr1.webp";
import c2 from "../assets/images/cr2.webp";
import c3 from "../assets/images/cr3.webp";
import c4 from "../assets/images/cr4.webp";

const Blog = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-20 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div class="p-4 md:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img
                class="lg:h-48 md:h-36 w-full object-cover object-center"
                src={c1}
                alt="Inventory Management"
              />
              <div class="p-6 bg-white dark:bg-gray-800 dark:text-white">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 dark:text-white mb-1">
                  FEATURE
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Inventory Management
                </h1>
                <p class="leading-relaxed mb-3">
                  Easily manage stock levels, product tracking, and order
                  restocking to keep your inventory under control.
                </p>
              </div>
            </div>
          </div>
          <div class="p-4 md:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img
                class="lg:h-48 md:h-36 w-full object-cover object-center"
                src={c2}
                alt="Order Tracking"
              />
              <div class="p-6 bg-white dark:bg-gray-800 dark:text-white">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 dark:text-white mb-1">
                  FEATURE
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Order Tracking
                </h1>
                <p class="leading-relaxed mb-3">
                  Keep track of orders, delivery status, and order history to
                  ensure smooth operations.
                </p>
              </div>
            </div>
          </div>
          <div class="p-4 md:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img
                class="lg:h-48 md:h-36 w-full object-cover object-center"
                src={c3}
                alt="Customer Management"
              />
              <div class="p-6 bg-white dark:bg-gray-800 dark:text-white">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 dark:text-white mb-1">
                  FEATURE
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Customer Management
                </h1>
                <p class="leading-relaxed mb-3">
                  Manage customer profiles, loyalty programs, and feedback to
                  improve customer relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Blog;
