
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
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-800">Compare Plans</h1>
      <p className="text-center text-blue-600 mb-10">Find the right plan for your team</p>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className="rounded-2xl shadow-md transition transform hover:scale-105 bg-white border border-gray-200 hover:border-blue-500 hover:shadow-lg"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-blue-700">
                {plan.name} {plan.popular && <Badge className="ml-2 bg-blue-600 text-white">Most Popular</Badge>}
              </CardTitle>
              <div className="text-3xl font-bold mt-2 text-blue-900">{plan.price}</div>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm text-gray-700">
                <li><strong>Projects:</strong> {plan.features.projects}</li>
                <li><strong>Support:</strong> {plan.features.support}</li>
                <li><strong>Analytics:</strong> {plan.features.analytics}</li>
              </ul>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">{plan.cta}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
