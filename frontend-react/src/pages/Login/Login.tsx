import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Eye, EyeOff, LinkIcon, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema, loginUser } from "@/validation/userSchema.ts";
import SocialButtons from "@/components/Auth/SocialButtons";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/auth";
import { signIn } from "@/api/authService";

type loginFields = loginUser;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<loginFields>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<loginFields> = async (data) => {
    try {
      const response = await signIn(data);
      if (!response.data.isVerified) {
        navigate(`/verifymail?email=${data.email}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data) {
        const backendError = axiosError.response.data.message;
        console.error("Error:", backendError);
        setError("root", { message: backendError });
      }
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-400 via-blue-200 to-blue-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />
      <div className="w-full max-w-xl z-10 flex items-center justify-center">
        <Card className="w-full h-full backdrop-blur-sm bg-white dark:bg-gray-900 shadow-xl border-0">
          <CardHeader className="space-y-1 flex flex-col items-center pt-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <LinkIcon className="text-white w-6 h-6" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
                FintechForge
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-8 py-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-800 dark:text-white">
                Welcome back
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Enter your credentials to access your account
              </p>
              {errors.root && (
                <div className="flex items-center bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md">
                  <AlertCircle className="w-5 h-5 mr-3" />
                  <span>{errors.root.message}</span>
                </div>
              )}
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-700"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      {...register("password")}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 pr-10 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />} Sign In
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SocialButtons />
            </div>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/SignUp" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
