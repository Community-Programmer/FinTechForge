import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What is FinTechForge?',
      answer: 'FinTechForge is a cutting-edge, open-source platform that delivers advanced, AI-powered financial tools and actionable insights. It includes features like sentiment analysis, secure authentication, and dynamic dashboards.'
    },
    {
      question: 'How secure is my financial data?',
      answer: 'We use industry-standard security practices including JWT-based authentication, encrypted data storage, and secure API communications. Your financial data is protected using best-in-class security measures.'
    },
    {
      question: 'Can I connect my investment accounts?',
      answer: 'Yes, our platform supports connecting multiple investment accounts to track your portfolio performance in real-time. We use secure APIs to ensure your account information remains protected.'
    },
    {
      question: 'How does the AI sentiment analysis work?',
      answer: 'Our AI analyzes financial news and social media data to provide sentiment analysis on stocks and markets. This helps you understand market trends and make more informed investment decisions.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'We offer a responsive web application that works seamlessly on mobile devices. A dedicated mobile app is planned for future development.'
    },
    {
      question: 'How can I reset my password?',
      answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your email to create a new password.'
    },
    {
      question: 'What financial instruments can I track?',
      answer: 'You can track stocks, cryptocurrencies, forex, ETFs, and other financial instruments. Our platform provides real-time data and historical trends for various market segments.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the feedback form on our website or by emailing support@fintechforge.com. We typically respond within 24 hours.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <HelpCircle className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about FinTechForge and how to make the most of our financial tools.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-blue-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-blue-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Still have questions? Reach out to our support team.
          </p>
          <Button 
            variant="outline" 
            className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={() => window.location.hash = '/feedback'}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;