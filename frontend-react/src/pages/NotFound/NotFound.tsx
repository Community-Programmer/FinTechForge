import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardContent className="pt-12 pb-8 px-6 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative">
              <h1 className="text-9xl font-bold text-slate-200 dark:text-slate-700 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-24 h-24 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Oops! The page you are looking for doesn't exist. It might have
              been moved or deleted.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full sm:w-auto min-w-[160px]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Link to="/" className="w-full sm:w-auto">
              <Button className="w-full min-w-[160px]">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              You might be interested in:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/dashboard">
                <Button variant="link" className="text-sm">
                  Dashboard
                </Button>
              </Link>
              <Link to="/Features">
                <Button variant="link" className="text-sm">
                  Features
                </Button>
              </Link>
              <Link to="/News">
                <Button variant="link" className="text-sm">
                  Market News
                </Button>
              </Link>
              <Link to="/education">
                <Button variant="link" className="text-sm">
                  Education Hub
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
