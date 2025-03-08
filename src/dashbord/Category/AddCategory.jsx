import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import cookie from 'js-cookie'
import BaseUrl from "../../../Api/BaseUrl";
const AddCategoey = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const token  = cookie.get('token')
  const onSubmit = async (data) => {
    // إعداد البيانات لإرسالها
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);

    try {
      // إرسال البيانات إلى السيرفر
      const response = await axios.post(`${BaseUrl}/api/vi/category`, formData, {
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
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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

export default AddCategoey;