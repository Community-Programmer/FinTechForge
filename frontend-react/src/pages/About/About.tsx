import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming shadcn/ui Card components

const About: React.FC = () => {
  return (
    <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black min-h-screen transition-colors duration-300">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-12 leading-tight">
        About <span className="text-blue-600 dark:text-blue-400">FinTechForge</span>
      </h1>

      <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
        <strong>FinTechForge</strong> is a cutting-edge, open-source, and highly modular platform crafted to deliver advanced, AI-powered financial tools and actionable insights. We're here to empower your financial innovation.
      </p>

      {/* Our Mission */}
      <Card className="mb-10 shadow-lg border-l-4 border-blue-500 dark:border-blue-400 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          At FinTechForge, our mission is to empower individuals and businesses with <strong>cutting-edge financial technology solutions</strong>. We believe in democratizing access to powerful tools and insights, enabling <strong>smarter financial decisions</strong> for everyone. We're dedicated to building robust, secure, and user-friendly applications that transform complex financial data into clear, actionable intelligence.
        </CardContent>
      </Card>

      {/* What We Offer */}
      <Card className="mb-10 shadow-lg border-l-4 border-blue-500 dark:border-blue-400 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
            What We Offer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          FinTechForge is more than just a set of tools; it's a comprehensive foundation for limitless innovation. We empower you to seamlessly:
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Integrate <strong>state-of-the-art AI algorithms</strong> for deep market insights and predictive analytics.</li>
            <li>Create highly <strong>interactive and engaging data visualizations</strong> that turn raw numbers into clear stories.</li>
            <li>Ensure <strong>top-tier security standards</strong> to protect sensitive financial data and user privacy.</li>
            <li>Leverage a <strong>modular architecture</strong> that allows for effortless extension and customization as your project evolves.</li>
          </ul>
          Whether you're exploring machine learning for market predictions, building real-time financial tracking dashboards, or enhancing user security features, FinTechForge serves as the ideal starting point for your financial solutions.
        </CardContent>
      </Card>

      {/* Features */}
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10 mt-16">
        Unlock Powerful Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              Secure Authentication System
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            A powerful and secure user authentication system built with <strong>Node.js</strong>, ensuring safe access to financial data and services. Your data integrity and user trust are paramount.
          </CardContent>
        </Card>

        <Card className="shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              AI-Powered News Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            Leverage artificial intelligence (powered by <strong>Python</strong>) to analyze financial news, detect real-time market sentiment, and gain valuable, data-driven insights for smarter decision-making.
          </CardContent>
        </Card>

        <Card className="shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              Dynamic Financial Dashboard & UI
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            A sleek, user-friendly interface crafted with <strong>React</strong>, designed to display real-time financial data, comprehensive analytics, and market trends through an engaging and highly responsive dashboard.
          </CardContent>
        </Card>

        <Card className="shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              Modular & Extensible Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            Designed with flexibility in mind, FinTechForge boasts a <strong>modular architecture</strong> that allows you to easily extend and customize the platform with new financial tools and features as your application evolves.
          </CardContent>
        </Card>

        <Card className="shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              API-based Design for Seamless Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            Our flexible, <strong>API-based architecture</strong> ensures seamless integration with other platforms, external financial services, and third-party tools, providing endless possibilities for your ecosystem.
          </CardContent>
        </Card>
      </div>


      <div className="text-center mt-12 py-8 bg-blue-50 dark:bg-blue-950 rounded-lg shadow-inner dark:shadow-blue-900 transition-colors duration-300">
        <p className="text-xl text-gray-800 dark:text-white font-medium mb-4">
          Ready to revolutionize your financial applications?
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Join the FinTechForge community and start building your vision for the future of finance today!
        </p>
      </div>
    </div>
  );
};

export default About;
