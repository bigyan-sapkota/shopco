import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputField from "../components/layouts/input-field";
import useLogin from "../mutations/use-login";
import { loginSchema } from "../schemas/login-form-schema";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { data: profile } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isLoading } = useLogin();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  if (profile) {
    navigate("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <InputField
            labelFor="Email"
            field="email"
            type="email"
            register={register}
            errorField={errors.email}
          />

          {/* Password */}
          <InputField
            labelFor="Password"
            field="password"
            type={isPasswordVisible ? "text" : "password"}
            register={register}
            errorField={errors.password}
            decorator={
              <button
                type="button"
                className="absolute top-9 right-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            }
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
