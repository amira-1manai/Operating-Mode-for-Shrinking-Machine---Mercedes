import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData, error: productError } = useGetProductByIdQuery(params._id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [wireSectionMm2, setWireSectionMm2] = useState("");
  const [contactReference, setContactReference] = useState("");
  const [refrenceTubeShrumph, setRefrenceTubeShrumph] = useState("");
  const [heaterDistance, setHeaterDistance] = useState("");
  const [topHeatingPlate, setTopHeatingPlate] = useState("");
  const [programNumber, setProgramNumber] = useState("");
  const [refrenceFrame, setRefrenceFrame] = useState("");
  const [cycleTime, setCycleTime] = useState("");
  const [fi, setFi] = useState("");

  useEffect(() => {
    if (productData) {
      setImage(productData.image || "");
      setName(productData.name || "");
      setDescription(productData.description || "");
      setWireSectionMm2(productData.wireSectionMm2 || "");
      setCategory(productData.category?._id || "");
      setContactReference(productData.contactReference || "");
      setRefrenceTubeShrumph(productData.refrenceTubeShrumph || "");
      setHeaterDistance(productData.heaterDistance || "");
      setTopHeatingPlate(productData.topHeatingPlate || "");
      setProgramNumber(productData.programNumber || "");
      setRefrenceFrame(productData.refrenceFrame || "");
      setCycleTime(productData.cycleTime || "");
      setFi(productData.fi || "");
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success("Image uploaded successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        setImage(res.image);
      } catch (err) {
        toast.error("Image upload failed. Try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the update data
      const data = {
        name,
        description,
        category,
        wireSectionMm2,
        contactReference,
        refrenceTubeShrumph,
        heaterDistance,
        topHeatingPlate,
        programNumber,
        refrenceFrame,
        cycleTime,
        fi,
        image, // Assuming this is a URL. If it’s a file, handle it differently.
      };

      // Update the product
      const response = await updateProduct({ productId: params._id, data }).unwrap();
      
      toast.success("Product successfully updated", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteProduct(params._id).unwrap();
        toast.success(`"${response.name}" is deleted`, {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      } catch (err) {
        console.error(err);
        toast.error("Delete failed. Try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update / Delete Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto w-full h-[40%]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? "Change Image" : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    id="name"
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
                    id="wireSectionMm2"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={wireSectionMm2}
                    onChange={(e) => setWireSectionMm2(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="contactReference">Contact Reference</label>
                  <input
                    type="number"
                    id="contactReference"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={contactReference}
                    onChange={(e) => setContactReference(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="refrenceTubeShrumph">Reference Tube Shrump</label>
                  <input
                    type="text"
                    id="refrenceTubeShrumph"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={refrenceTubeShrumph}
                    onChange={(e) => setRefrenceTubeShrumph(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="heaterDistance">Heater Distance</label>
                  <input
                    type="number"
                    id="heaterDistance"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={heaterDistance}
                    onChange={(e) => setHeaterDistance(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="topHeatingPlate">Top Heating Plate</label>
                  <input
                    type="text"
                    id="topHeatingPlate"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={topHeatingPlate}
                    onChange={(e) => setTopHeatingPlate(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="programNumber">Program Number</label>
                  <input
                    type="text"
                    id="programNumber"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={programNumber}
                    onChange={(e) => setProgramNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2 mb-3">
                  <label htmlFor="refrenceFrame">Reference Frame</label>
                  <input
                    type="text"
                    id="refrenceFrame"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={refrenceFrame}
                    onChange={(e) => setRefrenceFrame(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2 mb-3">
                  <label htmlFor="cycleTime">Cycle Time</label>
                  <input
                    type="number"
                    id="cycleTime"
                    className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                    value={cycleTime}
                    onChange={(e) => setCycleTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="fi">FI</label>
                <input
                  type="number"
                  id="fi"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={fi}
                  onChange={(e) => setFi(e.target.value)}
                />
              </div>
              
              <div className="">
                <button
                  type="submit"
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
