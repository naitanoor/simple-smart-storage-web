import React from "react";

import aboutUsImage from "../assets/img/Privacy-Policy.webp";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <img
            src={aboutUsImage}
            alt="Privacy Policy"
            className="mb-6 rounded-lg shadow-md"
          />
          <p
            className="text-gray-700 leading-loose"
            style={{
              fontFamily: 'Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif',
              fontWeight: 200,
              textTransform: "uppercase",
            }}
          >
            At our smart storage solution app, we value your privacy and are
            committed to protecting your personal information. We collect only
            the necessary data required for the functionality of our app, such
            as your email and storage preferences. We do not share your personal
            information with third parties without your consent. Rest assured
            that your data is securely stored and accessible only to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
