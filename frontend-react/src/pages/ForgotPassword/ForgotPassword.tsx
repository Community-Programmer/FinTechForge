import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { forgotPassword } from "@/api/authService";
import { useForm } from "react-hook-form";
import { emailFormData, emailSchema } from "@/validation/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseApiError } from "@/lib/apiError";

const ForgotPassword = () => {
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<emailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: emailFormData) => {
    try {
      await forgotPassword(data);
      setStatus(true);
      setErrorMessage(null);
    } catch (error) {
      const apiError = parseApiError(
        error,
        "We could not send the reset email. Please try again."
      );
      setErrorMessage(apiError.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-400 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="p-2 bg-blue-500 rounded-xl">
              <Link2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold">FinTechForge</span>
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">
            Forgot Password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {status
              ? "If an account exists for the email provided, you will receive password reset instructions."
              : "No problem! Enter your email address and we'll send you instructions to reset your password."}
          </p>
          {errorMessage && !status && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}
        </div>

        <div className="space-y-6">
          {!status ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 h-11"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}{" "}
                <Mail className="h-5 w-5 mr-2" />
                Send reset instructions
              </Button>
            </form>
          ) : (
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 h-11"
              onClick={() => {
                reset();
                setStatus(false);
              }}
            >
              <Mail className="h-5 w-5 mr-2" />
              Resend reset instructions
            </Button>
          )}

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Sign in
              </Link>
            </p>
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
