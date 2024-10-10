import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaClock, FaStar, FaTags, FaCheckCircle } from "react-icons/fa";
import moment from "moment";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview, error: reviewError }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      console.log("Submitting review...");
      const result = await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      console.log("Review submitted successfully:", result);
      refetch(); // Refresh product data
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Full error object:", JSON.stringify(error, null, 2));

      // Improved error handling
      let errorMessage = "An unexpected error occurred";

      if (error && typeof error === 'object') {
        // Check for specific properties and log them
        if (error.data) {
          console.log("Error Data:", JSON.stringify(error.data, null, 2));
          errorMessage = error.data.message || "An error occurred with the data";
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.error) {
          errorMessage = error.error;
        }
      }

      toast.error(errorMessage);
    }
  };

  const addToChecklistHandler = () => {
    console.log("Add to checklist handler");
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-start mt-[2rem] ml-[10rem]">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[30rem] lg:w-[25rem] md:w-[20rem] sm:w-[15rem] mr-[2rem]"
              />
              <FaCheckCircle
                className="absolute top-3 right-3 text-green-500"
                size={24}
              />
            </div>

            <div className="flex flex-col justify-between ml-[2rem] flex-1">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 text-[#B0B0B0]">{product.description}</p>

              <div className="flex items-center justify-between w-full mb-2">
                <div className="flex flex-col">
                  <h1 className="flex items-center mb-2">
                    <FaTags className="mr-2 text-white" /> Category:{" "}
                    {product.category}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="flex items-center mb-2">
                  <FaStar className="mr-2 text-white" /> Reviews:{" "}
                  {product.numReviews}
                </h1>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>

              <div className="flex justify-start items-center mt-4 mb-4">
                {product.countInStock > 0 && (
                  <div className="mr-4">
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container mt-2">
                <button
                  onClick={addToChecklistHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                >
                  Add To Checklist
                </button>
              </div>
            </div>

            <div className="flex-1 mt-[2rem] ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
