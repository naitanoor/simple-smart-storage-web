import React from "react";

import aboutUsImage from "../assets/img/warehouse.jpg";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{
              fontFamily: 'Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif',
              fontWeight: 400,
              letterSpacing: -1.5,
              textTransform: "uppercase",
            }}
          >
            About Us
          </h1>
          <img
            src={aboutUsImage}
            alt="About Us"
            className="mb-6 rounded-lg shadow-md"
          />

          <p
            className="text-gray-700 leading-loose font-sans"
            style={{
              fontFamily: 'Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif',
              fontWeight: 200,
              textTransform: "uppercase",
            }}
          >
            Welcome to our smart storage solution app! We aim to revolutionize
            the way you manage your boxes and items. With our app, you can
            easily create boxes, add items, and attach QR codes for efficient
            tracking and retrieval. Say goodbye to searching through cluttered
            storage areas - our app helps you locate your boxes with ease.
          </p>

          <p
            className="text-gray-700 leading-loose mt-4 font-sans"
            style={{
              fontFamily: 'Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif',
              fontWeight: 200,
              textTransform: "uppercase",
            }}
          >
            Our mission is to simplify and streamline the storage process for
            individuals and businesses alike. We understand the frustrations of
            managing physical belongings and aim to provide a digital solution
            that saves you time and effort. Our intuitive interface and advanced
            features make it easy to keep track of your items, their locations,
            and important details. Whether you have a small storage space or a
            large warehouse, our app is designed to scale with your needs.
          </p>

          <p
            className="text-gray-700 leading-loose mt-4 font-sans"
            style={{
              fontFamily: 'Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif',
              fontWeight: 200,
              textTransform: "uppercase",
            }}
          >
            We prioritize the security and privacy of your data. Our app employs
            industry-standard encryption protocols to ensure that your
            information remains safe and confidential. Your personal details are
            never shared with third parties without your explicit consent. We
            are committed to providing you with a secure and trustworthy storage
            management solution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
