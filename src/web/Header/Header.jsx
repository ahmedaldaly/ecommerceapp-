import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart, MdMenuOpen } from "react-icons/md";
import Cookies from "js-cookie";
import { BiMenuAltLeft } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import BaseUrl from "../../../Api/BaseUrl";
import { IoIosLogOut } from "react-icons/io";
import Cookie from "js-cookie";
import { useOrders } from "../../../context/OrderContext";
import { useFavorit } from "../../../context/Favorit";
const Header = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const [fevorite, setFevorite] = useState(false);
  const [order, setOrder] = useState(false);
  const [search, setSearch] = useState(false);
  const [getOrders, setGetOrder] = useState([]);
  const [getFev, setGetFev] = useState([]);
  const [val, setVal] = useState();
  const [valsearch, setValsearch] = useState([]);
  const { orders, deleteorder } = useOrders(); //استيراد الاوردر
  const { favorite, deleteFavorit } = useFavorit();
  useEffect(() => {
    if (orders) {
      setGetOrder(orders);
    } else {
      setGetOrder([]); // تعيين مصفوفة فارغة في حال لم يكن هناك بيانات
    }
  });

  useEffect(() => {
    if (favorite) {
      setGetFev(favorite);
    } else {
      setGetFev([]); // تعيين مصفوفة فارغة في حال لم يكن هناك بيانات
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onsupmit = async (data) => {
    try {
      const res = await axios.post(`${BaseUrl}/api/vi/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = res.data.token;
      const id = res.data.user.id;
      const admin = res.data.user.isAdmin;
      Cookies.set("token", token, { expires: 4 });
      Cookies.set("id", id, { expires: 4 });
      Cookies.set("admin", admin, { expires: 4 });
      alert("Login successful!");
      setLogin(!login);
    } catch (err) {
      if (err.response) {
        console.error("Error Response:", err.response.data);
        alert(
          "Login failed: " +
            (err.response.data.message || "Invalid credentials")
        );
      } else {
        console.error("Error Message:", err.message);
        alert("Login failed: " + err.message);
      }
    }
  };
  const gettoken = Cookies.get("token");

  useEffect(() => {
    async function fetch() {
      if (!val) {
        setValsearch([]); // إعادة ضبط النتائج عند تفريغ الإدخال
        return;
      }
      try {
        await axios
          .post(`${BaseUrl}/api/vi/search`, { title: val })

          .then((data) => {
            console.log(data.data);
            setValsearch(data.data);
          });
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, [val]);
  const admin = Cookie.get("admin");
  return (
    <div
      className={`fixed z-10 w-full h-24 lg:px-32 py-8 top-0 flex justify-evenly transition-shadow duration-300 ${
        isScrolled ? "shadow-lg bg-white" : "shadow-none bg-transparent"
      }`}
    >
      <img
        src="https://miniture.b-cdn.net/wp-content/themes/miniture/assets/images/logo.svg"
        alt="logo"
        className="h-full max-md:hidden"
      />
      <div
        onClick={() => setMenu(!menu)}
        className="menu mr-36 hover:text-orange-600 text-2xl hover:scale-125 duration-300 hidden max-md:block"
      >
        <BiMenuAltLeft />
      </div>
      <div className="flex max-md:hidden">
        <Link
          to="/"
          className="mx-5 text-lg font-mono hover:text-orange-500 hover:scale-125 duration-150"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="mx-5 text-lg font-mono hover:text-orange-500 hover:scale-125 duration-150"
        >
          Shop
        </Link>
        <Link to='/about' className="mx-5 text-lg font-mono hover:text-orange-500 hover:scale-125 duration-150">
          About Us
        </Link>
        <Link className="mx-5 text-lg font-mono hover:text-orange-500 hover:scale-125 duration-150">
          Contact Us
        </Link>
      </div>
      <div className="flex text-xl max-md:hidden">
        {gettoken ? (
          <div>
            <button
              onClick={() => {
                Cookies.remove("token"); // إزالة التوكن من الكوكيز
                window.location.reload(); // إعادة تحميل الصفحة لتحديث الحالة
              }}
              className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
            >
              <IoIosLogOut />
            </button>
          </div>
        ) : (
          <span
            onClick={() => setLogin(!login)} // فتح نافذة تسجيل الدخول
            className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
          >
            <FaRegUser />
          </span>
        )}

        <span
          onClick={() => setSearch(!search)}
          className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
        >
          <CiSearch />
        </span>
        <span
          onClick={() => setFevorite(!fevorite)}
          className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
        >
          <FaRegHeart />
        </span>
        <span
          onClick={() => setOrder(!order)}
          className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
        >
          <MdOutlineShoppingCart />
        </span>
      </div>
      <img
        src="https://miniture.b-cdn.net/wp-content/themes/miniture/assets/images/logo.svg"
        alt="logo"
        className="h-full max-md:w-24 hidden max-md:block"
      />
      <div className="max-md:flex text-xl hidden ">
        <span
          onClick={() => setSearch(!search)}
          className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
        >
          <CiSearch />
        </span>
        {gettoken ? (
          <div>
            <button
              onClick={() => {
                Cookies.remove("token"); // إزالة التوكن من الكوكيز
                window.location.reload(); // إعادة تحميل الصفحة لتحديث الحالة
              }}
              className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
            >
              <IoIosLogOut />
            </button>
          </div>
        ) : (
          <span
            onClick={() => setLogin(!login)} // فتح نافذة تسجيل الدخول
            className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
          >
            <FaRegUser />
          </span>
        )}
        {admin && <Link to="/dashbord">admin dashbord</Link>}
      </div>

      {/* الشريط الجانبي */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }} // حالة البداية
            animate={{ opacity: 1, x: 0 }} // حالة العرض
            exit={{ opacity: 0, x: "-100%" }} // حالة الإخفاء
            transition={{ duration: 0.5 }} // مدة الأنيميشن
            className="fixed h-full w-48 shadow-md bg-white left-0 top-0"
          >
            <div className="p-4">
              <h2
                onClick={() => setMenu(false)} // غلق الشريط الجانبي
                className="text-xl cursor-pointer right-5 absolute"
              >
                <MdMenuOpen />
              </h2>
              <Link className="block w-full p-3 hover:text-orange-600 hover:bg-gray-100 hover:scale-125 duration-300 mt-14">
                Home
              </Link>
              <Link className="block w-full p-3 hover:text-orange-600 hover:bg-gray-100 hover:scale-125 duration-300">
                Shop
              </Link>
              <Link className="block w-full p-3 hover:text-orange-600 hover:bg-gray-100 hover:scale-125 duration-300">
                About Us
              </Link>
              <Link className="block w-full p-3 hover:text-orange-600 hover:bg-gray-100 hover:scale-125 duration-300">
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* تسجيل الدخول */}
      <AnimatePresence>
        {login && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // حالة البداية
            animate={{ opacity: 1, x: 0 }} // حالة العرض
            exit={{ opacity: 0, x: "100%" }} // حالة الإخفاء
            transition={{ duration: 0.5 }} // مدة الأنيميشن
            className=" h-full w-96 shadow-md bg-white  fixed  right-0 top-0"
          >
            <div className="p-4">
              <h1
                onClick={() => setLogin(!login)} // غلق الشريط الجانبي
                className="text-xl mt-5  flex justify-between  w-11/12 cursor-pointer left-5 absolute "
              >
                <MdMenuOpen />
                <p>LogIn</p>
              </h1>
              <form className="mt-20 " onSubmit={handleSubmit(onsupmit)}>
                <div>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    className="w-11/12 mx-5 h-12 my-3 pl-3 border-2 border-gray-300"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Enter Your password"
                    required
                    className="w-11/12 mx-5 h-12 my-3 pl-3 border-2 border-gray-300"
                    {...register("passwoard", {
                      required: "Password is required",
                    })}
                  />
                  {errors.passwoard && (
                    <p style={{ color: "red" }}>{errors.passwoard.message}</p>
                  )}
                </div>

                <button
                  className="w-11/12 h-12 bg-orange-400 text-white mx-5 hover:bg-black hover:text-white duration-300"
                  type="submit"
                  style={{ marginTop: "1rem" }}
                >
                  Login
                </button>
              </form>
              <p className="mt-10 ml-6">
                Or/{" "}
                <Link
                  className="ml-5  text-orange-400 hover:text-black text-xl"
                  to="/signup"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fevorite && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // حالة البداية
            animate={{ opacity: 1, x: 0 }} // حالة العرض
            exit={{ opacity: 0, x: "100%" }} // حالة الإخفاء
            transition={{ duration: 0.5 }} // مدة الأنيميشن
            className=" h-full w-96 shadow-md bg-white  fixed  right-0 top-0"
          >
            <div className="p-4">
              <h1
                onClick={() => setFevorite(!fevorite)} // غلق الشريط الجانبي
                className="text-xl mt-5  flex justify-between  w-11/12 cursor-pointer left-5 absolute "
              >
                <MdMenuOpen />
                <p>Favorites </p>
              </h1>
              {
                getFev.map((item, i) => (
                  <div key={item._id} className="flex mt-20 ">
                    <div className=" w-36  ">
                      {typeof item.image?.url !== "string" ? (
                        <img key={i} src="path/to/logo.img" alt="default" />
                      ) : (
                        <img key={i} src={item.image.url} alt="" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">{item.title}</p>
                      <p className="text-end font-bold text-orange-500">
                        $ {item.price}.00
                      </p>
                      <button
                        onClick={() => deleteFavorit(item._id)}
                        className="w-20 h-9 bg-orange-500 rounded-full ml-40"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*  */}
      <AnimatePresence>
        {order && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // حالة البداية
            animate={{ opacity: 1, x: 0 }} // حالة العرض
            exit={{ opacity: 0, x: "100%" }} // حالة الإخفاء
            transition={{ duration: 0.5 }} // مدة الأنيميشن
            className=" h-full w-96 shadow-md bg-white  fixed  right-0 top-0"
          >
            <div className="p-4">
              <h1
                onClick={() => setOrder(!order)} // غلق الشريط الجانبي
                className="text-xl mt-5  flex justify-between  w-11/12 cursor-pointer left-5 absolute "
              >
                <MdMenuOpen />
                <p>Orders </p>
              </h1>
              <p className="mt-20 ">
                Go To/
                <Link to="/card" className="text-orange-500 hover:text-black">
                  Shoping Page
                </Link>{" "}
              </p>
              {getOrders.length > 0 ? (
                <div>
                  {getOrders.map((item) => (
                    <div key={item.id} className="flex mt-16">
                      <div className="w-36 h-auto">
                        <img
                          className="w-full h-full"
                          src={item.image.url}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-sm">{item.title}</p>
                        <p className="text-end font-bold text-orange-500">
                          ${item.price}.00
                        </p>
                        <button onClick={() => deleteorder(item.id)}>
                          {" "}
                          delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No Orders</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {search && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // حالة البداية
            animate={{ opacity: 1, x: 0 }} // حالة العرض
            exit={{ opacity: 0, x: "100%" }} // حالة الإخفاء
            transition={{ duration: 0.5 }} // مدة الأنيميشن
            className=" h-full w-full shadow-md bg-white  fixed  right-0 top-0"
          >
            <div className="p-4">
              <h1
                onClick={() => setSearch(!search)} // غلق الشريط الجانبي
                className="text-xl mt-5  flex justify-between  w-11/12 cursor-pointer left-5 absolute "
              >
                <MdMenuOpen />
                <p>Search </p>
              </h1>
              <div className="w-full flex">
                <input
                  className="w-[50%] mt-28  border-2   mx-auto h-14 rounded-full px-7 "
                  placeholder="Search...."
                  onChange={(e) => setVal(e.target.value)}
                  type="text"
                  name=""
                  id=""
                />
              </div>

              <div className="grid mt-7 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full mt-5">
                {valsearch.length > 0 ? (
                  valsearch.map((item) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.2 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      key={item._id}
                      className="bg-white shadow-md rounded-lg overflow-hidden transition-all hover:scale-105 p-4 flex flex-col"
                    >
                      {/* صورة المنتج */}
                      <div className="w-full h-full flex justify-center">
                        <img
                          src={item.image.url}
                          alt={item.title}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>

                      {/* بيانات المنتج */}
                      <div className="mt-4 flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3">
                          {item.desc}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-red-500 font-bold">
                            Sale: %{item.sale}
                          </span>
                          <span className="text-green-600 font-bold text-lg">
                            ${item.price}.00
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center mt-5 text-gray-500 col-span-full">
                    No results found
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
