import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming shadcn/ui Card components

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gray-50"> {/* Added background and increased padding */}
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 leading-tight"> {/* Larger, bolder heading */}
        About <span className="text-blue-600">FinTechForge</span>
      </h1>

      <p className="text-xl text-center text-gray-700 mb-16 max-w-3xl mx-auto"> {/* Centered, larger intro text */}
        **FinTechForge** is a cutting-edge, open-source, and highly modular platform crafted to deliver advanced, AI-powered financial tools and actionable insights. We're here to empower your financial innovation.
      </p>

      {/* Our Mission */}
      <Card className="mb-10 shadow-lg border-l-4 border-blue-500"> {/* Added shadow and border */}
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">Our Mission 💡</CardTitle> {/* Larger title */}
        </CardHeader>
        <CardContent className="text-lg text-gray-700 leading-relaxed"> {/* Improved readability */}
          At FinTechForge, our mission is to empower individuals and businesses with **cutting-edge financial technology solutions**. We believe in democratizing access to powerful tools and insights, enabling **smarter financial decisions** for everyone. We're dedicated to building robust, secure, and user-friendly applications that transform complex financial data into clear, actionable intelligence.
        </CardContent>
      </Card>

      {/* Who We Are & What We Offer */}
      <Card className="mb-10 shadow-lg border-l-4 border-green-500">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">What We Offer 💻</CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-gray-700 leading-relaxed">
          FinTechForge is more than just a set of tools; it's a comprehensive foundation for limitless innovation. We empower you to seamlessly:
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Integrate **state-of-the-art AI algorithms** for deep market insights and predictive analytics.</li>
            <li>Create highly **interactive and engaging data visualizations** that turn raw numbers into clear stories.</li>
            <li>Ensure **top-tier security standards** to protect sensitive financial data and user privacy.</li>
            <li>Leverage a **modular architecture** that allows for effortless extension and customization as your project evolves.</li>
          </ul>
          Whether you're exploring machine learning for market predictions, building real-time financial tracking dashboards, or enhancing user security features, FinTechForge serves as the ideal starting point for your financial solutions.
        </CardContent>
      </Card>

      {/* Key Features Section */}
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10 mt-16">
        Unlock Powerful Features ✨
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"> {/* Responsive grid layout */}

        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300"> {/* Hover effect */}
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-700">🔐 Secure Authentication System</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            A powerful and secure user authentication system built with **Node.js**, ensuring safe access to financial data and services. Your data integrity and user trust are paramount.
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-purple-700">🧠 AI-Powered News Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            Leverage artificial intelligence (powered by **Python**) to analyze financial news, detect real-time market sentiment, and gain valuable, data-driven insights for smarter decision-making.
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-green-700">📊 Dynamic Financial Dashboard & UI</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            A sleek, user-friendly interface crafted with **React**, designed to display real-time financial data, comprehensive analytics, and market trends through an engaging and highly responsive dashboard.
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-orange-700">🧩 Modular & Extensible Architecture</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            Designed with flexibility in mind, FinTechForge boasts a **modular architecture** that allows you to easily extend and customize the platform with new financial tools and features as your application evolves.
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-red-700">⚙️ API-based Design for Seamless Integration</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            Our flexible, **API-based architecture** ensures seamless integration with other platforms, external financial services, and third-party tools, providing endless possibilities for your ecosystem.
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12 py-8 bg-blue-50 rounded-lg shadow-inner">
        <p className="text-xl text-gray-800 font-medium mb-4">
          Ready to revolutionize your financial applications?
        </p>
        <p className="text-lg text-gray-600">
          Join the FinTechForge community and start building your vision for the future of finance today!
        </p>
        {/* You could add a call to action button here if desired */}
        {/* <Link to="/signup" className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
          Get Started
        </Link> */}
      </div>
    </div>
  );
};

export default About;