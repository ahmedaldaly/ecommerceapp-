import React, { useEffect, useState } from 'react';
import { useOrders } from "../../context/OrderContext";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import BaseUrl from '../../Api/BaseUrl';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';

const ShopCard = () => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [newAddress, setNewAddress] = useState('');  // حالة لتخزين العنوان الجديد
  const [isEditing, setIsEditing] = useState(false); // لتحديد إذا كنا في وضع التعديل على العنوان
  const [paypalLink, setPaypalLink] = useState(null); // حالة لتخزين رابط الدفع عبر باي بال

  // جلب الطلبات من الكونتكست
  const { orders, deleteorder, addorder } = useOrders();

  useEffect(() => {
    async function fetch() {
      await setProduct(orders);

      // حساب التوتال (مجموع الأسعار)
      const totalAmount = orders.reduce((sum, item) => {
        return sum + item.price;  // اجمع السعر فقط، دون النظر إلى الخصم
      }, 0);
      
      setTotal(totalAmount);
    }
    fetch();
  }, [orders]);

  // دالة لحذف الطلب وتحديث التوتال
  async function delet(id) {
    const token = Cookie.get('token');
    try {
      await axios.delete(`${BaseUrl}/api/vi/order/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(() => {
        // تحديث الحالة بعد الحذف
        const updatedProducts = product.filter(product => product.id !== id);
        setProduct(updatedProducts);

        // إعادة حساب المجموع الكلي بعد الحذف
        const newTotal = updatedProducts.reduce((sum, item) => {
          return sum + item.price;  // جمع الأسعار فقط بعد الحذف
        }, 0);

        setTotal(newTotal);  // تحديث المجموع الكلي بعد الحذف
      });
    } catch (err) {
      console.log(err);
    }
  }

  // دالة لتعديل العنوان
  async function handleAddressChange(id) {
    const token = Cookie.get('token');
    try {
      await axios.put(`${BaseUrl}/api/vi/order/${id}`, {
        address: newAddress,  // إرسال العنوان الجديد
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(() => {
        // تحديث المنتج بعد تعديل العنوان
        const updatedProducts = product.map(product => 
          product.id === id ? { ...product, address: newAddress } : product
        );
        setProduct(updatedProducts);
        setIsEditing(false);  // إيقاف وضع التعديل بعد التحديث
      });
    } catch (err) {
      console.log(err);
    }
  }

  // دالة للتفاعل مع الـ API الخلفي لإنشاء رابط باي بال
  const handlePaypalPayment = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/v1/paypal/pay`, { totalAmount: total });
      if (response.data.redirectUrl) {
        setPaypalLink(response.data.redirectUrl); // حفظ رابط الدفع
      }
    } catch (error) {
      console.error('Error initiating PayPal payment:', error);
    }
  };

  return (
    <div className='w-full h-auto mt-14 text-center'>
      <p className='font-bold text-2xl text-gray-600 my-10'>
        All Orders/ 
        <Link to='/' className='text-orange-500 '>Go To Home Page</Link>
      </p>
      <div className='flex justify-center'>
        {
          product === undefined || product.length === 0 ? (
            <div>no product</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
                {product.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    {/* صورة المنتج */}
                    <div className="relative w-full h-56">
                      <img
                        className="w-full h-full object-contain"
                        src={item.image.url}
                        alt={item.title}
                      />
                      {item.sale > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          خصم {item.sale}%
                        </span>
                      )}
                    </div>

                    {/* تفاصيل المنتج */}
                    <div className="p-5 text-center">
                      <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{item.desc}</p>

                      {/* السعر */}
                      <div className="mt-3 flex items-center justify-center space-x-2">
                        <p className="text-xl font-extrabold text-indigo-600">
                          ${item.price}.00
                        </p>
                        {item.sale > 0 && (
                          <p className="text-sm text-gray-400 line-through">
                            ${(item.price + (item.price * item.sale) / 100).toFixed(2)}
                          </p>
                        )}
                      </div>

                      {/* التقييم */}
                      <div className="mt-2 flex justify-center">
                        <Box>
                          <Rating name="simple-controlled" value={item.review} readOnly />
                        </Box>
                      </div>

                      {/* عرض وتعديل العنوان */}
                      <div className="mt-3">
                        {isEditing ? (
                          <div>
                            <input 
                              type="text" 
                              value={newAddress}
                              onChange={(e) => setNewAddress(e.target.value)} 
                              placeholder="Enter new address"
                              className="border p-2 rounded"
                            />
                            <button
                              onClick={() => handleAddressChange(item.id)}
                              className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg"
                            >
                              Save Address
                            </button>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-gray-500">{item.address}</p>
                            <button
                              onClick={() => {
                                setIsEditing(true);
                                setNewAddress(item.address);
                              }}
                              className="text-blue-500 mt-2"
                            >
                              Edit Address
                            </button>
                          </div>
                        )}
                      </div>

                      {/* زر الحذف */}
                      <button onClick={() => deleteorder(item.id)} className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-700">
                        delete order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      </div>

      {/* عرض المجموع الكلي */}
      <div className="mt-6 text-lg font-bold text-gray-800">
        Total: ${total.toFixed(2)}
      </div>

      {/* زر الدفع عبر باي بال */}
      <div className="mt-6">
        <button 
          onClick={handlePaypalPayment} 
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:bg-blue-700"
        >
          Pay with PayPal
        </button>
      </div>

      {/* إعادة توجيه إلى باي بال إذا تم إنشاء رابط الدفع */}
      {paypalLink && (
        <div className="mt-4">
          <a href={paypalLink} className="text-white bg-green-500 py-2 px-4 rounded-lg">
            Complete Payment on PayPal
          </a>
        </div>
      )}
    </div>
  );
};

export default ShopCard;
