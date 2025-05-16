// src/components/ErrorBoundary/RouteErrorBoundary.tsx
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ErrorBoundary() {
  const error = useRouteError();

  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    message = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  // pre-logging the errors for triaging production issues
  useEffect(() => {
    if (error) {
      console.error("Route Error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="max-w-md w-full bg-white p-6 rounded-lg border border-red-300 shadow">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h2 className="text-lg font-semibold text-red-700">
            Unexpected Application Error
          </h2>
        </div>
        <p className="text-sm text-gray-700">{message}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white"
        >
          Reload Page
        </Button>
      </div>
    </div>
  );
}
