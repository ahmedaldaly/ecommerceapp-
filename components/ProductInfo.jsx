import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseUrl from "../Api/BaseUrl";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const ProductInfo = ({ id, closeProductInfo }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`${BaseUrl}/api/vi/product/${id}`);
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div 
              onClick={closeProductInfo}
              className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-gray-200/20 backdrop-blur-lg border border-white/10"
            >
                <p className="text-lg font-semibold text-gray-600">جارٍ تحميل المنتج...</p>
            </div>
        );
    }

    return (
        <div 
          onClick={closeProductInfo} // عند النقر على الخلفية الشفافة، يتم إغلاق المنتج
          className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-gray-200/20 backdrop-blur-lg border border-white/10"
        >
            <div 
              onClick={(e) => e.stopPropagation()} // يمنع النقر داخل النافذة من إغلاقها
              className="w-[70%] bg-white p-5 rounded-lg shadow-lg"
            >
                {product.image && (
                    <div className="img flex justify-center">
                        <img
                            src={product.image.url}
                            alt={product.category || "Product Image"}
                            className=" w-[30%] object-cover rounded-md"
                        />
                        <div className="w-[60%]">
                            <h2 className="text-xl font-bold mt-4">{product.category}</h2>
                            <p className="text-gray-800 font-bold mt-2">{product.title}</p>
                            <p className="text-gray-600 mt-2">{product.desc}</p>
                            <p className="text-xl font-bold mt-4">Sale:{product.sale}%</p>

                            <p className="text-lg font-semibold mt-2 text-green-600">${product.price}</p>
                            <Box>
                                <Rating value={product.review} />
                            </Box>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;
