import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && <Header />}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <div className="container mx-auto px-4">
          <section className="text-center my-10">
            <Link
              to="/shop"
              className="bg-pink-600 text-white font-semibold rounded-full py-2 px-6 hover:bg-pink-700 transition"
            >
              Go to Shop
            </Link>
          </section>

      
        </div>
      )}
    </>
  );
};

export default Home;
