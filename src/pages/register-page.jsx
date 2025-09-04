import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/layouts/input-field";
import { useRegisterUser } from "../mutations/use-register";
import { registrationSchema } from "../schemas/registration-form-schema";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useProfile } from "../queries/use-profile";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { data } = useProfile();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const { mutate, isLoading } = useRegisterUser();

  if (data) {
    navigate("/");
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = (data) => {
    mutate({
      ...data,
      image: data.image[0],
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <InputField
            labelFor="Name"
            field="name"
            type="text"
            register={register}
            errorField={errors.name}
          />

          {/* Email */}
          <InputField
            labelFor="Email"
            field="email"
            type="email"
            register={register}
            errorField={errors.email}
          />
          <InputField
            labelFor="Password"
            field="password"
            type={isPasswordVisible ? "text" : "password"}
            errorField={errors.password}
            register={register}
          />

          {/* Confirm Password Field */}
          <InputField
            labelFor="Confirm Password"
            field="confirmPassword"
            type={isPasswordVisible ? "text" : "password"}
            errorField={errors.confirmPassword}
            register={register}
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

          {/* Image Upload */}
          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-400"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
