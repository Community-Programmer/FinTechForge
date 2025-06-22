import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Crown, Diamond, Rocket, LifeBuoy, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Premium: React.FC = () => {
  return (
    <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black min-h-screen transition-colors duration-300">
      <div className="text-center mb-16">
        <Crown className="h-20 w-20 text-yellow-500 mx-auto mb-6 drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Unlock the Full Power of <span className="text-blue-700 dark:text-blue-400">FinTechForge Premium</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Elevate your financial analysis and application development with exclusive features, dedicated support, and unparalleled insights designed for the serious innovator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section: Features */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-10 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
            Exclusive Features <Diamond className="ml-3 h-8 w-8 text-blue-500" />
          </h2>
          <ul className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
            {[
              {
                title: "Advanced AI Market Prediction Models",
                description: "Gain access to sophisticated machine learning algorithms for more accurate and timely market forecasts."
              },
              {
                title: "Real-Time Data Streams & APIs",
                description: "Connect to live, high-frequency financial data feeds for instantaneous insights and ultra-responsive applications."
              },
              {
                title: "Customizable Dashboard Widgets",
                description: "Personalize your FinTechForge dashboard with a wider array of widgets and deeper customization options for a tailored experience."
              },
              {
                title: "Enhanced Backtesting Capabilities",
                description: "Rigorously test your trading strategies against historical data with advanced simulation tools."
              },
              {
                title: "Priority Access to New Features",
                description: "Be the first to try out our latest innovations and cutting-edge tools before they are released to the public."
              },
              {
                title: "Ad-Free Experience",
                description: "Enjoy an uninterrupted and focused workflow without any advertisements."
              },
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-gray-900 dark:text-white">{feature.title}:</strong> {feature.description}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Support & Call to Action */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-10 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
            Unrivaled Support & Access <LifeBuoy className="ml-3 h-8 w-8 text-purple-500" />
          </h2>
          <ul className="space-y-6 text-lg text-gray-700 dark:text-gray-300 mb-12">
            {[
              {
                title: "Dedicated Premium Support",
                description: "Get expedited assistance from our expert team. Your queries are our top priority."
              },
              {
                title: "Exclusive Community Forum",
                description: "Connect with other premium users, share insights, and get advanced tips in a private, expert-moderated environment."
              },
              {
                title: "Personalized Onboarding & Tutorials",
                description: "Receive tailored guidance to help you maximize your FinTechForge Premium experience from day one."
              },
              {
                title: "Direct Feedback Channel",
                description: "Have a direct line to our development team for feature requests and suggestions, helping shape the future of FinTechForge."
              },
            ].map((support, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-gray-900 dark:text-white">{support.title}:</strong> {support.description}
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">Ready to Take Your FinTech Game to the Next Level?</h3>
            <p className="text-xl text-gray-800 dark:text-gray-200 mb-8">
              Join FinTechForge Premium today and experience unparalleled innovation and support.
            </p>
            <Link to="/Pricing">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto">
                <Rocket className="h-7 w-7 mr-3" /> Upgrade to Premium Now!
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials or trust badges */}
      <div className="mt-20 text-center text-gray-600 dark:text-gray-400">
        <p className="text-lg">
          Thousands of developers and analysts trust FinTechForge for their financial innovation needs.
        </p>
        <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mt-6" />
      </div>
    </div>
  );
};

export default Premium;
