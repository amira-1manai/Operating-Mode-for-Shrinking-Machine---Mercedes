import { Link } from "react-router-dom";
import CheckedIconCircle from "./CheckedIconCircle";
import { useState } from "react";
import QRCode from "qrcode.react";

const ProductCard = ({ p }) => {
  const [showQRCode, setShowQRCode] = useState(false);

  const generateQRCode = (product) => {
    // Simplify the QR code data
    return JSON.stringify({
      id: product._id,
      name: product.name,
      description: product.description,
      wireSectionMm2: product.wireSectionMm2,
      contactReference: product.contactReference,
      refrenceTubeShrumph: product.refrenceTubeShrumph,
      heaterDistance: product.heaterDistance,
      topHeatingPlate: product.topHeatingPlate,
      programNumber: product.programNumber,
      refrenceFrame: product.refrenceFrame,
      cycleTime: product.cycleTime,
      fi: product.fi,
    });
  };

  const qrData = generateQRCode(p);

  return (
    <div className="max-w-sm bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5 flex flex-col items-center">
        {/* QR Code Toggle Button */}
        <button
          onClick={() => setShowQRCode(!showQRCode)}
          className="mb-4 bg-pink-500 text-white px-3 py-2 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          {showQRCode ? "Hide QR Code" : "Show QR Code"}
        </button>

        {/* QR Code Display */}
        {showQRCode && (
          <div className="mb-4">
            <QRCode
              value={qrData}
              size={256} // Increased size for better scanning
              renderAs="canvas" // Render as canvas
              level="H" // High error correction level
              includeMargin={true} // Add margin around QR code
            />
          </div>
        )}

        {/* Product Image and Details */}
        <Link to={`/product/${p._id}`} className="w-full">
          <img
            className="w-full rounded-t-lg cursor-pointer"
            src={p.image}
            alt={p.name}
            style={{ height: "170px", objectFit: "cover" }}
          />
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {p?.brand}
          </span>
        </Link>
        <CheckedIconCircle product={p} />
      </div>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-white dark:text-white">{p?.name}</h5>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          {p?.description?.substring(0, 60)} ...
        </p>

        <Link
          to={`/product/${p._id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
        >
          Read More
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  
</body>
</html>

<title>
*/