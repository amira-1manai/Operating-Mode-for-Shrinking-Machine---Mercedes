import { useSelector } from "react-redux";
import { selectCheckedProducts } from "../../redux/features/checked/checkedSlice"; // Ensure this path is correct
import Product from "./Product";

const CheckedProducts = () => {
  const checkedProducts = useSelector(selectCheckedProducts);

  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold mt-[3rem] ml-[3rem]">
        CHECKED PRODUCTS
      </h1>

      <div className="flex flex-wrap gap-4 mt-4">
        {checkedProducts.length > 0 ? (
          checkedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">No checked products found.</p>
        )}
      </div>
    </div>
  );
};

export default CheckedProducts;
