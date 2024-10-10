import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Import FaCheckCircle
import { FaArrowRight } from "react-icons/fa"; // Import FaArrowRight

const SmallProduct = ({ product }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [notification, setNotification] = useState('');

  const handleCheckClick = () => {
    setIsChecked(!isChecked);
    setNotification(isChecked ? 'Unchecked' : 'Checked');
    setTimeout(() => setNotification(''), 2000); // Clear notification after 2 seconds
  };

  return (
    <div className="w-[20rem] ml-[2rem] p-4 bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <FaCheckCircle
          onClick={handleCheckClick}
          className={`absolute top-3 right-3 cursor-pointer transition-colors ${isChecked ? 'text-blue-500' : 'text-green-500'}`}
          size={24}
        />
        <Link to={`/product/${product._id}`} className="absolute bottom-3 left-3">
          <FaArrowRight
            className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
            size={24}
          />
        </Link>
        {notification && (
          <div className="absolute bottom-3 right-3 text-sm text-gray-700 bg-gray-200 p-2 rounded shadow-lg">
            {notification}
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`} className="no-underline">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            {product.name}
          </h2>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
