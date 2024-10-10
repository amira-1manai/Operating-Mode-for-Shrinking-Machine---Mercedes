import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[40rem] lg:w-[40rem] md:w-[46rem] sm:w-[30rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              createdAt,
              numReviews,
              rating,
            }) => (
              <div key={_id} className="p-4 flex flex-col items-center">
                <div className="w-full flex justify-center">
                  <img
                    src={image}
                    alt={name}
                    className="max-w-[20rem] h-[20rem] object-cover rounded-lg"
                  />
                </div>

                <div className="mt-4 flex flex-col items-center lg:flex-row lg:justify-between lg:w-full">
                  <div className="text-center lg:text-left lg:w-1/2">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-lg font-medium mt-1">{price}</p>
                    <p className="mt-2 text-gray-600">
                      {description.substring(0, 170)}...
                    </p>
                  </div>

                  <div className="text-center lg:text-left lg:w-1/2 mt-4 lg:mt-0">
                    <div className="mb-4">
                      <h1 className="flex items-center justify-center lg:justify-start mb-2 text-sm">
                        <FaStore className="mr-2 text-gray-600" /> Store
                      </h1>
                      <h1 className="flex items-center justify-center lg:justify-start mb-2 text-sm">
                        <FaClock className="mr-2 text-gray-600" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center justify-center lg:justify-start mb-2 text-sm">
                        <FaStar className="mr-2 text-gray-600" /> Reviews:{" "}
                        {numReviews}
                      </h1>
                    </div>

                    <div>
                      <h1 className="flex items-center justify-center lg:justify-start mb-2 text-sm">
                        <FaStar className="mr-2 text-gray-600" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
