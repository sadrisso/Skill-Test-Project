// @flow strict

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

function ProductDetails() {
  const { id } = useParams();
  const withAxios = useAxios();
  const [item, setItem] = useState({})

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = () => {
    withAxios.get(`/item/${id}`).then((res) => {
      console.log("Api Response: ",res?.data)
      setItem(res?.data)
    });
  };

  console.log("item data", item);
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Item Image */}
        <div className="flex justify-center bg-gray-100 p-6">
          <img
            src={item?.image || "https://via.placeholder.com/400"}
            alt={item?.name}
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>

        {/* Item Details */}
        <div className="p-6">
          <h2 className="text-4xl font-bold text-gray-900">{item?.name}</h2>
          <p className="text-lg text-gray-600 mt-2">{item?.description}</p>

          <div className="mt-4">
            <span className="text-2xl font-semibold text-blue-600">
              ${item?.price} / {item?.unit}
            </span>
            <span className="ml-4 px-3 py-1 text-sm font-medium rounded-full text-white 
              bg-green-500">
              {item?.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition">
              🛒 Add to Cart
            </button>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition">
              ⚡ Buy Now
            </button>
          </div>

          <div className="mt-6 text-gray-500">
            <p><span className="font-semibold text-gray-700">Category:</span> {item?.category}</p>
            <p><span className="font-semibold text-gray-700">Stock:</span> {item?.stock} {item?.unit} available</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
