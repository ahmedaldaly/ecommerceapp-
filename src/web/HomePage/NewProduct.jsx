import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../Api/BaseUrl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as motion from 'motion/react-client'
import { CiHeart,CiSearch } from "react-icons/ci";
 import './new.css'
const NewProduct = () => {
  const [products, setProducts] = useState([]); // إنشاء حالة لتخزين المنتجات
 const [slidesToShow, setSlidesToShow] = useState(5);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${BaseUrl}/api/vi/product`);
        // قم بتخزين أول 5 منتجات فقط
        setProducts(response.data.slice(0, 5));
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    }
    fetchProducts();
  }, []);


      // تحديث عدد الشرائح بناءً على عرض الشاشة
      useEffect(() => {
          const updateSlidesToShow = () => {
              const width = window.innerWidth;
              if (width >= 1024) {
                  setSlidesToShow(5);
              } else if (width >= 768) {
                  setSlidesToShow(4);
              } else if (width >= 480) {
                  setSlidesToShow(3);
              } else {
                  setSlidesToShow(2);
              }
          };
  
          // استدعاء الوظيفة عند التحميل وفي كل مرة يتغير حجم النافذة
          updateSlidesToShow();
          window.addEventListener('resize', updateSlidesToShow);
  
          // تنظيف الحدث عند إلغاء تحميل المكون
          return () => {
              window.removeEventListener('resize', updateSlidesToShow);
          };
      }, []);
  

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: slidesToShow, // عدد الشرائح بناءً على الحالة
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
};
  
  return (
    <div className="max-md:px-2 max-2xl:px-10 2xl:px-60">
      <h2 className="font-bold text-3xl">This week’s highlights</h2>
      {/* عرض المنتجات */}
     <div>
     <Slider {...settings} >
                {products.map((item,i) => (
                    <motion.div
                    initial={{opacity:0 ,marginTop:'70px'}}
                    whileInView={{opacity:1,marginTop:'20px'}}
                    transition={{duration:0.3,delay:i*0.2}}
                    key={item._id} className='mx-10 mm '>
                        <div className='w-11/12 overflow-hidden'>
                            <img
                                className='w-full  duration-500 h-full '
                                src={item.image.url}
                                alt="category"
                            />
                            <motion.div 
                            initial={{opacity:0,scale:1.5}}
                            whileInView={{opacity:1,scale:1}}
                            transition={{duration:0.3}}
                            className='aa absolute hover:bg-orange-500 hover:text-white duration-300 top-14 w-10 h-10  bg-white  hidden justify-center py-2 rounded-full text-2xl'><CiHeart/></motion.div>
                            <motion.div
                             initial={{opacity:0,scale:1.5}}
                             whileInView={{opacity:1,scale:1}}
                             transition={{duration:0.5}}
                            className='aa absolute hover:bg-orange-500 hover:text-white duration-300 top-28 w-10 h-10  bg-white  hidden justify-center py-2 rounded-full text-2xl'><CiSearch/></motion.div>
                        </div>
                        <p className='text-lg font-bold  hover:text-orange-600 mt-4'>{item.title}</p>
                        <p className='text-lg font-bold  hover:text-orange-600 mt-4'>${item.price}.00</p>
                        
                    </motion.div>
                ))}
            </Slider>
     </div>
    </div>
  );
};

export default NewProduct;
