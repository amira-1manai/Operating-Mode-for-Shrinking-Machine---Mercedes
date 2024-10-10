


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [wireSectionMm2, setWireSectionMm2] = useState(0);
  const [contactReference, setContactReference] = useState(0);
  const [refrenceTubeShrumph, setRefrenceTubeShrumph] = useState(0);
  const [heaterDistance, setHeaterDistance] = useState(0);
  const [topHeatingPlate, setTopHeatingPlate] = useState(0);
  const [programNumber, setProgramNumber] = useState(0);
  const [refrenceFrame, setRefrenceFrame] = useState("");
  const [cycleTime, setCycleTime] = useState(0);
  const [fi, setFi] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("wireSectionMm2", wireSectionMm2);
      productData.append("contactReference", contactReference);
      productData.append("refrenceTubeShrumph", refrenceTubeShrumph);
      productData.append("heaterDistance", heaterDistance);
      productData.append("topHeatingPlate", topHeatingPlate);
      productData.append("programNumber", programNumber);
      productData.append("refrenceFrame", refrenceFrame);
      productData.append("cycleTime", cycleTime);
      productData.append("fi", fi);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed. Try again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className={!image ? "hidden" : "text-white"}
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description">Description</label> <br />
                <textarea
                  id="description"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                />
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="wireSectionMm2">Wire Section (mm²)</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={wireSectionMm2}
                    onChange={(e) => setWireSectionMm2(Number(e.target.value))}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="contactReference">Contact Reference</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={contactReference}
                    onChange={(e) => setContactReference(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="refrenceTubeShrumph">Reference Tube Shrump</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={refrenceTubeShrumph}
                    onChange={(e) => setRefrenceTubeShrumph(Number(e.target.value))}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="heaterDistance">Heater Distance</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={heaterDistance}
                    onChange={(e) => setHeaterDistance(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="topHeatingPlate">Top Heating Plate</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={topHeatingPlate}
                    onChange={(e) => setTopHeatingPlate(Number(e.target.value))}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="programNumber">Program Number</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={programNumber}
                    onChange={(e) => setProgramNumber(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="refrenceFrame">Reference Frame</label>
                  <input
                    type="text"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={refrenceFrame}
                    onChange={(e) => setRefrenceFrame(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="cycleTime">Cycle Time</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={cycleTime}
                    onChange={(e) => setCycleTime(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full pr-2 mb-3">
                  <label htmlFor="fi">FI</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={fi}
                    onChange={(e) => setFi(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-[#f43f5e] text-white px-5 py-3 rounded-md"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;























/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // Ensure description is included
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const [wireSectionMm2, setWireSectionMm2] = useState(0);
  const [contactReference, setContactReference] = useState(0);
  const [referenceTubeShrump, setReferenceTubeShrump] = useState(0); // Corrected naming
  const [heaterDistance, setHeaterDistance] = useState(0);
  const [topHeatingPlate, setTopHeatingPlate] = useState(600);
  const [programNumber, setProgramNumber] = useState(0);
  const [referenceFrame, setReferenceFrame] = useState("");
  const [cycleTime, setCycleTime] = useState(0);
  const [fi, setFi] = useState(0);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const productData = {
        image,
        name,
        description, // Ensure description is included
        price: Number(price), // Ensure price is a number
        category,
        quantity: Number(quantity), // Ensure quantity is a number
        brand,
        countInStock: stock,
        wireSectionMm2,
        contactReference,
        referenceTubeShrump, // Corrected naming
        heaterDistance,
        topHeatingPlate,
        programNumber,
        referenceFrame,
        cycleTime,
        fi,
      };

      console.log("Product Data: ", productData);

      const { data } = await createProduct(productData);

      console.log("API Response Data:", data);

      if (data?.error) {
        toast.error("Product creation failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload Image"}

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className={!image ? "hidden" : "text-white"}
                />
              </label>
            </div>

            {/* Form Fields 
            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="two ml-10 ">
                  <label htmlFor="price">Price</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Description *
              <div className="mb-3">
                <label htmlFor="description">Description</label> <br />
                <textarea
                  id="description"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                />
              </div>

              {/* Wire Section, Contact Reference *
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="wireSectionMm2">Wire Section (mm²)</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={wireSectionMm2}
                    onChange={(e) => setWireSectionMm2(Number(e.target.value))}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="contactReference">Contact Reference</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={contactReference}
                    onChange={(e) => setContactReference(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Reference Tube Shrump, Heater Distance *
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="referenceTubeShrump">
                    Reference Tube Shrump
                  </label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={referenceTubeShrump}
                    onChange={(e) => setReferenceTubeShrump(Number(e.target.value))}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="heaterDistance">Heater Distance</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={heaterDistance}
                    onChange={(e) => setHeaterDistance(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Top Heating Plate, Program Number *
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="topHeatingPlate">Top Heating Plate</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={topHeatingPlate}
                    onChange={(e) => setTopHeatingPlate(Number(e.target.value))}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="programNumber">Program Number</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={programNumber}
                    onChange={(e) => setProgramNumber(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Reference Frame, Cycle Time *
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="referenceFrame">Reference Frame</label>
                  <input
                    type="text"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={referenceFrame}
                    onChange={(e) => setReferenceFrame(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="cycleTime">Cycle Time</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={cycleTime}
                    onChange={(e) => setCycleTime(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* FI *
              <div className="flex flex-wrap">
                <div className="w-full pr-2 mb-3">
                  <label htmlFor="fi">FI</label>
                  <input
                    type="number"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={fi}
                    onChange={(e) => setFi(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Select Category *
              <div className="mb-3">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-[#f43f5e] text-white px-5 py-3 rounded-md"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
*/