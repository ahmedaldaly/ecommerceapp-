import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as motion from 'motion/react-client'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './home.css';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import Explore from './Explore';
import NewProduct from './NewProduct';
import Craft from './Craft';
import New from './New';
import ForItem from './ForItem';
import Footer from './Footer';

const HomePage = () => {
  const data = [
    {
      title: `FutureWear <br/> Timepiece Odyssey`,
      ptop: 'The Perpetual ChronoSculpt',
      pdown: 'Feel free to adapt or modify them to suit your specific <br/> collection or branding.',
      image: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m11_slide_01.jpg',
    },
    {
      title: `FutureWear <br/> Timepiece Odyssey`,
      ptop: 'The Perpetual ChronoSculpt',
      pdown: 'Feel free to adapt or modify them to suit your specific <br/> collection or branding.',
      image: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m11_slide_02.jpg',
    },
    {
      title: `FutureWear <br/> Timepiece Odyssey`,
      ptop: 'The Perpetual ChronoSculpt',
      pdown: 'Feel free to adapt or modify them to suit your specific <br/> collection or branding.',
      image: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m11_slide_03.jpg',
    },
  ];

  return (
    <>
    <div className="w-full overflow-hidden flex max-lg:block max-md:px-2 max-2xl:px-10 2xl:px-60">
      
    <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000, // الزمن بين كل انزلاق (بالملي ثانية)
          disableOnInteraction: false, // لإعادة التشغيل حتى بعد التفاعل
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper w-[900px] max-lg:w-11/12 max-md:h-[250px] max-lg:h-[350px] h-[500px] rounded-xl  overflow-hidden"
        
      >
       
        {data.map((item, index) => (   
           
          <SwiperSlide key={index} className="relative">
              
           
            <motion.div
              initial={{ opacity:0 ,left:'-300px' }}
              animate={{ opacity: 1, left: 0 }}
              exit={{ opacity: 0, left: '-300px' }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full overflow-hidden"
            >

            <div className="relative w-full h-full overflow-hidden">
              <img
                className="w-full  h-full object-cover transition-transform duration-500 hover:scale-110"
                src={item.image}
                alt="image"
              />
            </div>
            <p className="absolute text-gray-600 top-16 left-14">{item.ptop}</p>
            <h3
              className="absolute top-24 left-14 font-bold text-4xl max-md:text-lg"
              dangerouslySetInnerHTML={{ __html: item.title }}
            ></h3>
            <p
              className="absolute max-md:hidden top-48 text-gray-700 left-14"
              dangerouslySetInnerHTML={{ __html: item.pdown }}
              ></p>
            <button
              className="absolute w-40 text-white rounded-full h-12 bg-orange-500 max-md:top-40 top-72 left-14 hover:bg-black hover:text-white duration-500"
            >
              Shop Now
            </button>
              </motion.div>
          </SwiperSlide>
      
        ))}
        
      </Swiper>
      
      <div className="con w-[550px] h-[500px] max-lg:h-[450px] ml-5 max-lg:w-11/12 max-lg:ml-7 max-lg:mt-7 ">

        <motion.div
        initial={{opacity:0,right:'-400px'}}
        animate={{opacity:1,right:'0'}}
        transition={{duration:1}}
        className='cc  w-full h-1/2 overflow-hidden max-lg:mb-7 rounded-xl relative  mb-2'>
          <img className='ii w-full h-full' src="https://miniture.b-cdn.net/wp-content/uploads/2023/10/m11_b_01.jpeg" alt="image" />
          <h4 className='absolute top-8 left-6 text-white font-bold text-3xl'>Smart Home in<br />  Electronics</h4>
          <div className='tit w-40 h-12 bg-white rounded-tr-3xl absolute bottom-0'>
            <button className='w-36 h-10 hover:bg-black duration-500 text-white bg-orange-500 my-2 mx-1 rounded-3xl'>Shop Now</button>
          </div>
        </motion.div>

        <motion.div 
        initial={{opacity:0,right:'-400px'}}
        animate={{opacity:1,right:'0'}}
        transition={{duration:1,delay:0.5}}
        className='cc w-full h-1/2 overflow-hidden rounded-xl relative'>
          <img  className='ii w-full h-full' src="https://miniture.b-cdn.net/wp-content/uploads/2023/10/m11_b_02.jpeg" alt="image" />
          <h4 className='absolute top-8 left-6 text-white font-bold text-3xl'>Digital Photo <br /> Frames</h4>
          <div className='tit w-40 h-12 bg-white rounded-tr-3xl absolute max-lg:bottom-7 bottom-2'>
            <button className='w-36 h-10 hover:bg-black duration-500 text-white bg-orange-500 my-2 mx-1 rounded-3xl'>Shop Now</button>
          </div>
        </motion.div>
      </div>
    </div>
    <div className='w-full overflow-hidden'>
    <Explore/>
    <NewProduct/>
    <Craft/>
    <NewProduct/>
    <New/>
    <NewProduct/>
    <ForItem/>
    <Footer/>
    </div>
          </>
  );
};

export default HomePage;
