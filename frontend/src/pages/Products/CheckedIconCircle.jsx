import { useEffect } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToChecked,
  removeFromChecked,
  setChecked,
} from "../../redux/features/checked/checkedSlice";

import {
  addCheckedToLocalStorage,
  getCheckedFromLocalStorage,
  removeCheckedFromLocalStorage,
} from "../../Utils/localStorage";

const CheckedIconCircle = ({ product }) => {
  const dispatch = useDispatch();
  const checkedItems = useSelector((state) => state.checked) || [];
  const isChecked = checkedItems.some((p) => p._id === product._id);

  useEffect(() => {
    const checkedFromLocalStorage = getCheckedFromLocalStorage();
    dispatch(setChecked(checkedFromLocalStorage));
  }, [dispatch]);

  const toggleChecked = () => {
    if (isChecked) {
      dispatch(removeFromChecked(product));
      // Remove the product from localStorage as well
      removeCheckedFromLocalStorage(product._id);
    } else {
      dispatch(addToChecked(product));
      // Add the product to localStorage as well
      addCheckedToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleChecked}
    >
      {isChecked ? (
        <FaCheckCircle className="text-pink-500" />
      ) : (
        <FaRegCircle className="text-white" />
      )}
    </div>
  );
};

export default CheckedIconCircle;
