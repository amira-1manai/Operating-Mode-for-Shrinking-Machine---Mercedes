import { useSelector } from "react-redux";
import { selectCheckedProducts } from "../../redux/features/checked/checkedSlice";

const CheckedCount = () => {
  const checkedProducts = useSelector(selectCheckedProducts);
  const checkedCount = checkedProducts.length;

  return (
    <div className="absolute left-2 top-8">
      {checkedCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {checkedCount}
        </span>
      )}
    </div>
  );
};

export default CheckedCount;
