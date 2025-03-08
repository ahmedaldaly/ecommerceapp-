import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../Api/BaseUrl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as motion from 'motion/react-client'
const Explore = () => {
    const [catigory, setCatigory] = useState([]);
    const [slidesToShow, setSlidesToShow] = useState(7); // العدد الافتراضي للشرائح

    useEffect(() => {
        async function fetch() {
            await axios.get(`${BaseUrl}/api/vi/category`)
                .then((data) => {
                    setCatigory(data.data);
                });
        }
        fetch();
    }, []);

    // تحديث عدد الشرائح بناءً على عرض الشاشة
    useEffect(() => {
        const updateSlidesToShow = () => {
            const width = window.innerWidth;
            if (width >= 1024) {
                setSlidesToShow(7);
            } else if (width >= 768) {
                setSlidesToShow(5);
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
        <div className='max-md:px-2 max-2xl:px-10 2xl:px-60 my-10'>
            <h2 className='font-bold text-3xl'>Explore Popular Categories</h2>  
            <Slider {...settings}>
                {catigory.map((item,i) => (
                    <motion.div
                    initial={{opacity:0 ,marginTop:'70px'}}
                    whileInView={{opacity:1,marginTop:'20px'}}
                    transition={{duration:0.3,delay:i*0.2}}
                    key={item._id} className='mt-7 hover:text-orange-600 text-center'>
                        <div className='w-40 h-40 rounded-full overflow-hidden'>
                            <img
                                className='w-full hover:scale-125 duration-500 h-full rounded-full'
                                src={item.image.url}
                                alt="category"
                            />
                        </div>
                        <p className='text-lg font-bold mr-9 mt-4'>{item.name}</p>
                    </motion.div>
                ))}
            </Slider>
        </div>
    );
};

export default Explore;
