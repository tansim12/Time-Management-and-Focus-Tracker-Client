"use client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "../Context/user.context";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FXForm from "../Components/Form/FXForm";
import { authSchemas } from "../Schemas/auth.schema";
import CustomInput from "../Components/Form/CustomInput";
import CustomButton from "../Components/ui/Button/CustomButton";
import { useUserLogin } from "../hooks/auth.hook";
import Loading from "../Components/ui/Loading/Loading";
import { Button } from "@nextui-org/button";
import { LuArrowLeft } from "react-icons/lu";

const CLoginPage = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");
  const { setIsLoading: userSetLoading } = useUser();

  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data as any);
    userSetLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        navigate.push(redirect);
      } else {
        navigate.push("/");
      }
    }
  }, [isPending, isSuccess]);

  const loginDemo = (data: any) => {
    handleLogin(data as any);
    userSetLoading(true);
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="flex justify-center items-center h-screen w-screen container mx-auto px-2 ">
        <div className="max-w-3xl  p-6 shadow-md sm:px-8 sm:py-10 lg:px-12 lg:py-16 ">
          <div className="flex flex-col justify-between space-x-0 sm:flex-row sm:space-x-12">
            <div className="mb-8 w-full sm:mb-0 sm:w-1/2">
              {/* Left side form */}

              <h2 className="mb-6 text-3xl font-bold tracking-tight light:text-lightText flex items-center gap-3">
                <LuArrowLeft
                  onClick={() => navigate.push("/")}
                  className="cursor-pointer"
                />{" "}
                Sign In
              </h2>

              <FXForm
                onSubmit={onSubmit}
                resolver={zodResolver(authSchemas.loginSchema)}
              >
                <div className="  ">
                  <CustomInput
                    name="email"
                    label="Email"
                    type="email"
                    //   isLabelColor={true}
                    placeholder={"abc@gmail.com"}
                  />
                  <CustomInput
                    name="password"
                    label="password"
                    type="password"
                    isLabelColor={true}
                    placeholder={"password"}
                  />
                </div>
                <div className="mb-6 flex items-center space-x-2 accent-sky-600">
                  <input type="checkbox" id="keep_signed_in" />
                  <label
                    className="select-none text-sm font-medium light:text-lightText"
                    htmlFor="keep_signed_in"
                  >
                    Keep me signed in
                  </label>
                </div>

                <CustomButton name="Login" customCss="w-full" />
              </FXForm>
              <p className="mt-6 flex gap-1 text-sm light:text-lightText">
                Did you
                <span
                  // onClick={() => navigate("/forget-password")}
                  className="text-sky-500 underline cursor-pointer"
                >
                  forget your password?
                </span>
              </p>
            </div>
            {/* Right side content */}
            <div className="w-full sm:w-1/2">
              <p className="mb-6 text-sm light:text-lightText">
                If you don&apos;t already have an account click the button below
                to create your account.
              </p>
              <button
                onClick={() => {
                  navigate.push("/register");
                }}
                className="mb-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium uppercase text-white hover:bg-zinc-700"
              >
                Create Account
              </button>
              <p className="my-4 text-center light:text-lightText">OR</p>
              <div>
                <div className="mb-6">
                  <h2 className="mb-3 text-blue-500">Login Demo Credential:</h2>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        loginDemo({
                          email: "u1@gmail.com",
                          password: "password123",
                        })
                      }
                    >
                      User Credentials
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        loginDemo({
                          email: "a1@gmail.com",
                          password: "password123",
                        })
                      }
                    >
                      Admin Credentials
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CLoginPage;
