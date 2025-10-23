import { Button } from "@/components/ui/button";
import {
  Link2,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import { verifyUserEmail } from "@/api/authService";
import { parseApiError } from "@/lib/apiError";

const VerificationStatus = () => {
  const { verificationToken } = useParams();

  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const verifyEmail = async () => {
      setStatus("LOADING");
      try {
        const response = await verifyUserEmail(verificationToken);
        if (response.data.success) {
          if (
            response.data.code === "ALREADY_VERIFIED" ||
            response.data.code === "VERIFIED"
          ) {
            setStatus("VERIFIED");
            setMessage(response.data.message);
          }
        }
      } catch (error) {
        const apiError = parseApiError(
          error,
          "We could not verify your email. Please request a new link."
        );
        setStatus("VERIFICATION_ERROR");
        setMessage(apiError.message);
      }
    };

    verifyEmail();
  }, [verificationToken]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-400 flex items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="p-2 bg-blue-500 rounded-xl">
              <Link2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold">FinTechForge</span>
          </div>

          {status === "LOADING" && (
            <div className="flex flex-col justify-center items-center gap-5">
              <BarLoader />
              <span className="animate-fadeblink  text-blue-600">
                Please wait while we verify your email
              </span>
            </div>
          )}

          {status === "VERIFIED" && (
            <>
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-gray-900">
                  {message}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Your email has been verified. You can now access all features
                  of your account.
                </p>
              </div>

              <div className="space-y-6">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 h-11"
                  asChild
                >
                  <Link to="/profile">Go to Profile</Link>
                </Button>

                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-500">
                    Need help?{" "}
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Contact support
                    </a>
                  </p>
                  <p className="text-sm text-gray-500">
                    Want to update your profile?{" "}
                    <Link
                      to="#"
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Go to Settings
                    </Link>
                  </p>
                </div>
              </div>
            </>
          )}

          {status === "VERIFICATION_ERROR" && (
            <>
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Email Verification Failed
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  We're sorry, but we couldn't verify your email address. This
                  could be due to an expired or invalid verification link.
                </p>
              </div>

              <div className="space-y-6">
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <HelpCircle
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        What can you do now?
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            Try signing up again with the same email address
                          </li>
                          <li>
                            Check if you have typed your email correctly during
                            sign-up
                          </li>
                          <li>Contact our support team for assistance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-500">
                    Need help?{" "}
                    <Link
                      to="#"
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Contact support
                    </Link>
                  </p>
                </div>

                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 h-11"
                  asChild
                >
                  <Link to="/signup">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Back to Sign Up
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VerificationStatus;
