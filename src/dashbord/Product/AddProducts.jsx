import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import cookie from 'js-cookie'
import BaseUrl from '../../../Api/BaseUrl'
const AddProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const token  = cookie.get('token')
  const onSubmit = async (data) => {
    // إعداد البيانات لإرسالها
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("review", data.review);
    formData.append("sale", data.sale);
    formData.append("image", data.image[0]);

    try {
      // إرسال البيانات إلى السيرفر
      const response = await axios.post(`${BaseUrl}/api/vi/product`, formData, {
        headers: {
          authorization:`Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });
      console.log("Response:", response.data);
      alert("Data sent successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to send data. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Upload Data</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* حقل الاسم */}
        <div className="mb-4">
          <label  htmlFor="title" className="block text-sm font-medium mb-2">
            Title:
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Name is required" })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

         {/* حقل الاسم */}
         <div className="mb-4">
          <label htmlFor="desc" className="block text-sm font-medium mb-2">
            Description:
          </label>
          <input
            id="desc"
            type="text"
            {...register("desc", { required: "desc is required" })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.desc ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your description"
          />
          {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>}
        </div>

 {/* حقل الاسم */}
 <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
          Category:
          </label>
          <input
            id="category"
            type="text"
            {...register("category", { required: "category is required" })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your category"
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

 {/* حقل الاسم */}
 <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium mb-2">
          Price:
          </label>
          <input
            id="price"
            type="number"
            {...register("price", { required: "price is required" })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your price"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

         {/* حقل الاسم */}
 <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium mb-2">
          Review:
          </label>
          <input
            id="review"
            type="number"
            {...register("review", { required: "review is required" })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.review ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your review"
          />
          {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>}
        </div>

         {/* حقل الاسم */}
 <div className="mb-4">
          <label htmlFor="sale" className="block text-sm font-medium mb-2">
          Sale:
          </label>
          <input
            id="sale"
            type="number"
            {...register("sale", { required: "sale is required" })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.sale ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your sale"
          />
          {errors.sale && <p className="text-red-500 text-sm mt-1">{errors.sale.message}</p>}
        </div>

        {/* حقل الصورة */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            {...register("image", {
              required: "Image is required",
            })}
            className="w-full"
            accept="image/*"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        {/* زر الإرسال */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProducts;