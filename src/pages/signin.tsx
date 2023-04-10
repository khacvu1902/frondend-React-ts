import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

type Props = {};

const Signin = (props: Props) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onHandleSubmit = async (data: any) => {
        try {
            const { data: user } = await login(data);
            localStorage.setItem("user", JSON.stringify(user));
            if (user.user.role == "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };
    return (
        <div className="p-[100px]">
            <section className="relative flex flex-wrap lg:h-screen lg:items-center">
                <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                    <form
                        action=""
                        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
                        onSubmit={handleSubmit(onHandleSubmit)}
                    >
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    {...register("email")}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                    {...register("password")}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                No account?
                                <a className="underline" href="/signup">
                                    Sign up
                                </a>
                            </p>

                            <button
                                type="submit"
                                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Signin;