import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './web/Home';
import HomeDashbord from './dashbord/HomeDashbord';
import AllUser from './dashbord/user/AllUsers';
import AllProducts from './dashbord/Product/AllProducts';
import AddProducts from './dashbord/Product/AddProducts';
import AllCategory from './dashbord/Category/AllCategory';
import AddCategory from './dashbord/Category/AddCategory';
import AllOrder from './dashbord/order/AllOrder';
import HomePage from './web/HomePage/HomePage';
import Shop from './web/shop/Shop';
import ShopCard from './auth/ShopCard';
import SignUp from './auth/SignUp';
import cookie from 'js-cookie';
import NoteFound from './web/NoteFound';
import About from './web/about/About';

// مكون لحماية المسارات الخاصة بالإدمن
const PrivateRoute = ({ children }) => {
  const admin = cookie.get('admin'); // جلب قيمة admin من الكوكيز
  return admin === 'true' ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Routes>
      {/* المسارات العامة */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/card" element={<ShopCard />} />
      <Route path="/" element={<Home />}>
      <Route path="/about" element={<About />} />
        <Route index element={<HomePage />} />
        <Route path="shop" element={<Shop />} />
      </Route>

      {/* حماية مسار الداشبورد */}
      <Route
        path="/dashbord"
        element={
          <PrivateRoute>
            <HomeDashbord />
          </PrivateRoute>
        }
      >
        <Route path="alluser" element={<AllUser />} />
        <Route path="allproducts" element={<AllProducts />} />
        <Route path="addproducts" element={<AddProducts />} />
        <Route path="allCategory" element={<AllCategory />} />
        <Route path="addcategory" element={<AddCategory />} />
        <Route path="allorder" element={<AllOrder />} />
      </Route>
      <Route path='*' element={<NoteFound/>}/>
    </Routes>
  );
};

export default App;
