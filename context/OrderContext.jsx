import { createContext, useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import BaseUrl from "../Api/BaseUrl";

// ✅ إنشاء الـ Context
const OrderContext = createContext();

// ✅ مزود الـ Context
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const id = cookie.get("id");
  const token = cookie.get("token");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("No token found, skipping API call.");
        return;
      }
      try {
        const response = await axios.get(`${BaseUrl}/api/vi/order/userorder`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response ==0) {
          setOrders ([])
        }
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      }
    };

    fetchOrders();
  });
  
  async function deleteorder(id) {
    const gettoken = cookie.get('token')
    try{
      const res = await axios.delete(`${BaseUrl}/api/vi/order/${id}`,{
        headers: {
          authorization: `Bearer ${gettoken}`
        }
      })
      setOrders(orders.filter(order => order.id !== id));
    }catch(err){
      console.log(err)
    }
  }

  async function addorder(id) {
    const token = cookie.get('token');
    try {
      await axios.post(`${BaseUrl}/api/vi/order/add`, { product: id }, {
        headers: { "authorization": `Bearer ${token}` },
      });

      setOrders(prevOrders => new Set(prevOrders).add(id));
      alert('Product added successfully');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <OrderContext.Provider value={{ orders  , deleteorder,addorder}}>
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Hook لاستخدام البيانات بسهولة في المكونات الأخرى
export const useOrders = () => useContext(OrderContext);
