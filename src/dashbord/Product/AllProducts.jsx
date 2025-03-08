import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../Api/BaseUrl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import cookie from 'js-cookie'
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);


  // إعداد useForm
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  // جلب المنتجات
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/vi/product`);
        setProducts(response.data);
        console.log(response)

      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [editMode]);
const token  = cookie.get('token')
  // حذف المنتج
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/api/vi/product/${id}`, {
        headers: {
          authorization:`Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // تعديل المنتج
  const handleEdit = (product) => {
    setEditMode(true);
    setCurrentProduct(product);
    setValue("title", product.title);
    setValue("price", product.price);
    setValue("desc",product.desc)
    setValue("sale", product.sale)
    setValue("review" ,product.review)
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`${BaseUrl}/api/vi/product/${currentProduct._id}`, data, {
        headers: {
          authorization:`Bearer ${token}`,
        },
      });
      const updatedProduct = response.data;

      // تحديث حالة المنتجات محليًا
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );

      setEditMode(false);
      reset();
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Products</h1>

      {/* قائمة المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 group"
          >
            <div className="h-56 bg-gray-100 flex items-center justify-center relative overflow-hidden">
              <img
                src={item.image.url}
                alt={item.title}
                className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 transition-all duration-300"></div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* نموذج تعديل المنتج */}
      {editMode && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
              </div>

 <div className="mb-4">
                <label className="block text-gray-700 mb-2">Review :</label>
                <input
                  type="number"
                  {...register("review", { required: "Price is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.review && <p className="text-red-500">{errors.review.message}</p>}
              </div>


              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Sale :</label>
                <input
                  type="number"
                  {...register("sale", { required: "Price is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.sale && <p className="text-red-500">{errors.sale.message}</p>}
              </div>


 <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description :</label>
                <input
                  type="text"
                  {...register("desc", { required: "Price is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.desc && <p className="text-red-500">{errors.desc.message}</p>}
              </div>


              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditMode(false) } }
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AllProducts;
