import React from "react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button
import { CheckCircle, Crown, Diamond, Rocket, LifeBuoy, Zap, TrendingUp } from "lucide-react"; // Icons for features
import { Link } from "react-router-dom"; // For the "Upgrade Now" button

const Premium: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="text-center mb-16">
        <Crown className="h-20 w-20 text-yellow-500 mx-auto mb-6 drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Unlock the Full Power of <span className="text-blue-700">FinTechForge Premium</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Elevate your financial analysis and application development with exclusive features, dedicated support, and unparalleled insights designed for the serious innovator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section: Features */}
        <div className="bg-white rounded-xl shadow-2xl p-10 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center">
            Exclusive Features <Diamond className="ml-3 h-8 w-8 text-blue-500" />
          </h2>
          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Advanced AI Market Prediction Models:</strong> Gain access to sophisticated machine learning algorithms for more accurate and timely market forecasts.
              </div>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Real-Time Data Streams & APIs:</strong> Connect to live, high-frequency financial data feeds for instantaneous insights and ultra-responsive applications.
              </div>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Customizable Dashboard Widgets:</strong> Personalize your FinTechForge dashboard with a wider array of widgets and deeper customization options for a tailored experience.
              </div>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Enhanced Backtesting Capabilities:</strong> Rigorously test your trading strategies against historical data with advanced simulation tools.
              </div>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Priority Access to New Features:</strong> Be the first to try out our latest innovations and cutting-edge tools before they are released to the public.
              </div>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Ad-Free Experience:</strong> Enjoy an uninterrupted and focused workflow without any advertisements.
              </div>
            </li>
          </ul>
        </div>

        {/* Right Section: Support & Call to Action */}
        <div className="bg-white rounded-xl shadow-2xl p-10 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center">
            Unrivaled Support & Access <LifeBuoy className="ml-3 h-8 w-8 text-purple-500" />
          </h2>
          <ul className="space-y-6 text-lg text-gray-700 mb-12">
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Dedicated Premium Support:</strong> Get expedited assistance from our expert team. Your queries are our top priority.
              </div>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Exclusive Community Forum:</strong> Connect with other premium users, share insights, and get advanced tips in a private, expert-moderated environment.
              </div>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Personalized Onboarding & Tutorials:</strong> Receive tailored guidance to help you maximize your FinTechForge Premium experience from day one.
              </div>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <strong className="font-semibold text-gray-900">Direct Feedback Channel:</strong> Have a direct line to our development team for feature requests and suggestions, helping shape the future of FinTechForge.
              </div>
            </li>
          </ul>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-700 mb-6">Ready to Take Your FinTech Game to the Next Level?</h3>
            <p className="text-xl text-gray-800 mb-8">
              Join FinTechForge Premium today and experience unparalleled innovation and support.
            </p>
            {/* Directs to a /pricing page, assuming you have one or will create one */}
            <Link to="/Pricing">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto">
                <Rocket className="h-7 w-7 mr-3" /> Upgrade to Premium Now!
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials or trust badges could go here */}
      <div className="mt-20 text-center text-gray-600">
        <p className="text-lg">
          Thousands of developers and analysts trust FinTechForge for their financial innovation needs.
        </p>
        <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mt-6" />
      </div>

    </div>
  );
};

export default Premium;