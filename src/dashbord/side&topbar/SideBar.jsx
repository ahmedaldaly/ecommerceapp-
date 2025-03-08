import React from 'react';
import { motion } from 'framer-motion'; // تأكد من استيراد motion بشكل صحيح
import { HiOutlineUsers } from "react-icons/hi2";
import { TbShoppingBagEdit, TbShoppingBagPlus, TbCategory2, TbCategoryPlus } from "react-icons/tb";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './style.css';

const SideBar = () => {
  // مصفوفة تحتوي على بيانات اللينكات
  const links = [
    { icon: <HiOutlineUsers />, text: "All Users", link: "alluser" },
    { icon: <TbShoppingBagEdit />, text: "All Products", link: "allproducts" },
    { icon: <TbCategory2 />, text: "All Categorys", link: "allCategory" },
    { icon: <TbShoppingBagPlus />, text: "Add Product", link: "addproducts" },
    { icon: <TbCategoryPlus />, text: "Add Categorys", link: "addcategory" },
    { icon: <FaCartArrowDown />, text: "All Orders", link: "allorder" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, marginLeft: '-70px' }}
      animate={{ opacity: 1, marginLeft: '0px' }}
      transition={{ duration: 0.3, delay: 1 }}
      className='w-20 side h-full z-10 fixed shadow-md overflow-hidden hover:w-60 bg-white duration-500 top-0 left-0 py-20'
    >
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.link} // استخدام الرابط من المصفوفة
          className='w-full flex whitespace-nowrap hover:text-orange-600 duration-300 hover:scale-105 py-6'
        >
          <span className='ml-6 text-3xl'>{link.icon}</span>
          <span className='text hidden ml-3 text-2xl'>{link.text}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export default SideBar;