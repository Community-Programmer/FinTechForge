import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Basic",
    price: "500/mo",
    features: {
      projects: "1 project",
      support: "Email support",
      analytics: "Basic analytics",
    },
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "1500/mo",
    features: {
      projects: "5 projects",
      support: "Priority email support",
      analytics: "Advanced analytics",
    },
    cta: "Upgrade",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "8000/mo",
    features: {
      projects: "Unlimited projects",
      support: "Phone & email support",
      analytics: "Custom analytics",
    },
    cta: "Contact Sales",
    popular: false,
  },
];

export default function StatePage() {
  return (
    <div className="w-full px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Compare <span className="text-blue-700 dark:text-blue-400">Plans</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
           Find the right plan for your team
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className="rounded-2xl shadow-md transition transform hover:scale-105 
              bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
              hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-blue-700 dark:text-white">
                {plan.name}{" "}
                {plan.popular && (
                  <Badge className="ml-2 bg-blue-600 text-white dark:bg-blue-500">
                    Most Popular
                  </Badge>
                )}
              </CardTitle>
              <div className="text-3xl font-bold mt-2 text-blue-900 dark:text-blue-400">
                {plan.price}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Projects:</strong> {plan.features.projects}
                </li>
                <li>
                  <strong>Support:</strong> {plan.features.support}
                </li>
                <li>
                  <strong>Analytics:</strong> {plan.features.analytics}
                </li>
              </ul>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500">
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
