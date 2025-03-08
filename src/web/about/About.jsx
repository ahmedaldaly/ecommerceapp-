import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-gray-700 mb-6">
          We are an eCommerce store dedicated to providing the best products with high quality and competitive prices. 
          Our goal is to offer a comfortable and secure shopping experience for our customers with excellent support service.
        </p>
        <div className="flex justify-center gap-6">
          <div className="text-center">
            <img src="https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603_640.jpg" className="mx-auto w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg" alt="Trust" />
            <p className="mt-2 text-sm text-gray-600">Customer Trust</p>
          </div>
          <div className="text-center">
            <img src="https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww" className="mx-auto w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg" alt="Quality" />
            <p className="mt-2 text-sm text-gray-600">Product Quality</p>
          </div>
          <div className="text-center">
            <img src="https://img.freepik.com/free-vector/worldwide-e-commerce-concept_23-2147657845.jpg" className="mx-auto w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg" alt="Support" />
            <p className="mt-2 text-sm text-gray-600">Continuous Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;