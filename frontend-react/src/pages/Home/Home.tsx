import React from "react";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  CreditCard,
  DollarSign,
  Globe,
  LineChart,
  Newspaper,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import dashboardImage from "@/assets/image.png";
import mobileImage from "@/assets/mobile.png";
import mainImage from "@/assets/main.png";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm">
              <span className="mr-1 rounded-full bg-blue-500 px-1.5 py-0.5 text-xs font-medium text-white">
                New
              </span>
              <span className="text-muted-foreground">
                AI-powered financial insights
              </span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tighter text-foreground md:text-6xl lg:text-7xl">
              Your <span className="text-blue-500">Financial Future</span>,
              <br />
              Powered by AI
            </h1>
            <p className="mt-6 max-w-[42rem] text-muted-foreground text-xl">
              Real-time market data, AI sentiment analysis, and personalized
              financial insights — all in one beautiful dashboard.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-12 px-8 bg-blue-500 hover:bg-blue-600"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8">
                View Demo
              </Button>
            </div>
            <div className="mt-16 w-full max-w-5xl overflow-hidden rounded-xl border bg-background shadow-xl">
              <img
                src={dashboardImage}
                alt="Dashboard Preview"
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                All-in-one Financial Intelligence
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Everything you need to make smarter financial decisions
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<LineChart className="h-10 w-10 text-blue-500" />}
                title="Real-time Market Data"
                description="Track stocks, crypto, and forex markets with live updates and historical trends."
              />
              <FeatureCard
                icon={<Newspaper className="h-10 w-10 text-blue-500" />}
                title="AI Sentiment Analysis"
                description="News and social media sentiment analysis to gauge market mood and trends."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-blue-500" />}
                title="Personalized Insights"
                description="AI-powered recommendations tailored to your financial goals and risk tolerance."
              />
              <FeatureCard
                icon={<Globe className="h-10 w-10 text-blue-500" />}
                title="Currency Conversion"
                description="Real-time currency exchange rates and conversion tools for global investors."
              />
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section id="dashboard" className="bg-slate-50 dark:bg-gray-900 py-20">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                  Your Complete Financial Command Center
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our intuitive dashboard brings together all your financial
                  data in one place, with AI-powered insights to help you make
                  better decisions.
                </p>
                <ul className="mt-8 space-y-4">
                  <DashboardFeature
                    icon={<Zap className="h-5 w-5 text-blue-500" />}
                    title="Real-time Updates"
                    description="Market data refreshed every minute to keep you informed."
                  />
                  <DashboardFeature
                    icon={<CreditCard className="h-5 w-5 text-blue-500" />}
                    title="Portfolio Tracking"
                    description="Connect your accounts to track performance across all investments."
                  />
                  <DashboardFeature
                    icon={<DollarSign className="h-5 w-5 text-blue-500" />}
                    title="AI Robo-Advisor"
                    description="Get personalized investment recommendations based on your goals."
                  />
                </ul>
                <Button className="mt-8 bg-blue-500 hover:bg-blue-600">
                  Explore Dashboard Features
                </Button>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-xl border bg-background shadow-xl">
                  <img
                    src={mainImage}
                    alt="Dashboard Interface"
                    className="w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 overflow-hidden rounded-xl border bg-background shadow-xl w-48 h-48 md:w-64 md:h-64">
                  <img
                    src={mobileImage}
                    alt="Mobile App"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Trusted by Investors Worldwide
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                See what our users are saying about their experience
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <TestimonialCard
                quote="The AI sentiment analysis has completely changed how I approach my investments. I can now make decisions based on data, not just gut feelings."
                author="Sarah J."
                role="Day Trader"
              />
              <TestimonialCard
                quote="As someone new to investing, the personalized insights have been invaluable. It's like having a financial advisor in my pocket."
                author="Michael T."
                role="Retail Investor"
              />
              <TestimonialCard
                quote="The real-time dashboard has streamlined my workflow. I can monitor all my investments in one place and react quickly to market changes."
                author="Elena R."
                role="Portfolio Manager"
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        {/* <section id="pricing" className="bg-slate-50 py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-xl text-muted-foreground">Choose the plan that's right for you</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <PricingCard
              title="Basic"
              price="Free"
              description="Perfect for beginners exploring the market"
              features={[
                "Real-time market data",
                "Basic portfolio tracking",
                "Daily news digest",
                "Limited AI insights",
              ]}
              buttonText="Get Started"
              buttonVariant="outline"
            />
            <PricingCard
              title="Pro"
              price="$19/month"
              description="For active investors seeking an edge"
              features={[
                "Everything in Basic",
                "Full AI sentiment analysis",
                "Personalized investment recommendations",
                "Advanced portfolio analytics",
                "Priority support",
              ]}
              buttonText="Start 7-Day Free Trial"
              buttonVariant="default"
              highlighted={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For professional traders and teams"
              features={[
                "Everything in Pro",
                "API access",
                "Custom integrations",
                "Dedicated account manager",
                "Team collaboration tools",
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section> */}

        {/* CTA */}
        <section className="bg-blue-500 dark:bg-blue-900 py-16">
          <div className="container">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
                Ready to transform your financial future?
              </h2>
              <p className="mt-4 text-xl text-blue-50">
                Join thousands of investors making smarter decisions with AI
              </p>
              <Button
                size="lg"
                className="mt-8 bg-white text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-200"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
function FeatureCard({ icon, title, description }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function DashboardFeature({ icon, title, description }) {
  return (
    <div className="flex items-start">
      <div className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full border bg-background">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, role }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 text-4xl text-blue-500">"</div>
        <p className="mb-4 text-lg">{quote}</p>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  highlighted = false,
}) {
  return (
    <Card
      className={`overflow-hidden ${
        highlighted ? "border-blue-500 shadow-lg ring-1 ring-blue-500" : ""
      }`}
    >
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Free" && price !== "Custom" && (
            <span className="ml-1 text-muted-foreground">/month</span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckIcon className="mr-2 h-4 w-4 text-blue-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={`mt-8 w-full ${
            highlighted ? "bg-blue-500 hover:bg-blue-600" : ""
          }`}
          variant={buttonVariant}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
