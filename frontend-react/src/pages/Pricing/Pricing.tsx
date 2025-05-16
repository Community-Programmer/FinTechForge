
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Basic",
    price: "500/mo",
    features: ["1 project", "Email support", "Basic analytics"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "2000/mo",
    features: ["5 projects", "Priority email support", "Advanced analytics"],
    cta: "Upgrade",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "8000/mo",
    features: ["Unlimited projects", "Phone & email support", "Custom analytics"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function StatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Choose Your Plan</h1>
      <p className="text-center text-gray-600 mb-10">Flexible pricing for teams of all sizes</p>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`rounded-2xl shadow-md transition transform hover:scale-105 ${
              plan.popular ? "border-2 border-primary" : ""
            }`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl">
                {plan.name} {plan.popular && <Badge className="ml-2">Most Popular</Badge>}
              </CardTitle>
              <div className="text-3xl font-bold mt-2">{plan.price}</div>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-gray-700 text-sm">
                    • {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">{plan.cta}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
